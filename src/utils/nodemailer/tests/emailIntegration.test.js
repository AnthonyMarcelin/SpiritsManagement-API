import { expect } from 'chai';
import sinon from 'sinon';
import request from 'supertest';

import app from '../../../../index.js';
import User from '../../../models/user.model.js';
import * as emailService from '../authEmailService.js';

describe('Email Integration Tests', () => {
    let emailStubs;

    beforeEach(() => {
        // Mock toutes les fonctions d'email
        emailStubs = {
            sendVerificationEmail: sinon.stub(emailService, 'sendVerificationEmail').resolves({ messageId: 'test-id' }),
            sendPasswordResetEmail: sinon.stub(emailService, 'sendPasswordResetEmail').resolves({ messageId: 'test-id' }),
            sendPasswordChangeConfirmation: sinon.stub(emailService, 'sendPasswordChangeConfirmation').resolves({ messageId: 'test-id' })
        };
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('Registration Email Flow', () => {
        const testUser = {
            pseudo: 'emailtest',
            firstname: 'Email',
            lastname: 'Test',
            email: 'emailtest@example.com',
            password: 'TestPassword123!'
        };

        afterEach(async () => {
            // Cleanup
            try {
                await User.destroy({ where: { email: testUser.email } });
            } catch (error) {
                // Ignorer si l'utilisateur n'existe pas
            }
        });

        it('should send verification email on user registration', async () => {
            // Act
            const res = await request(app)
                .post('/auth/register')
                .send(testUser)
                .expect(201);

            // Assert - Messages en français selon votre contrôleur
            expect(res.body.message).to.include('Vérifiez votre email');
            expect(emailStubs.sendVerificationEmail.calledOnce).to.be.true;

            const callArgs = emailStubs.sendVerificationEmail.getCall(0).args;
            expect(callArgs[0]).to.equal(testUser.email);
            expect(callArgs[1]).to.equal(testUser.firstname);
            expect(callArgs[2]).to.be.a('string'); // verification token
        });

        it('should not send email if registration fails', async () => {
            // Arrange - user with invalid data
            const invalidUser = { ...testUser, password: '123' };

            // Act
            await request(app)
                .post('/auth/register')
                .send(invalidUser)
                .expect(400);

            // Assert
            expect(emailStubs.sendVerificationEmail.called).to.be.false;
        });
    });

    describe('Email Verification Flow', () => {
        let user;
        let verificationToken;

        beforeEach(async () => {
            // Setup: Create unverified user
            const userData = {
                pseudo: 'unverified',
                firstname: 'Unverified',
                lastname: 'User',
                email: 'unverified@test.com',
                password: 'TestPassword123!'
            };

            await request(app)
                .post('/auth/register')
                .send(userData);

            // Get the created user and token
            user = await User.findOne({ where: { email: userData.email } });
            verificationToken = user.verificationToken;
        });

        afterEach(async () => {
            // Cleanup
            if (user) {
                try {
                    await User.destroy({ where: { id: user.id } });
                } catch (error) {
                    // Ignore
                }
            }
        });

        it('should verify email with valid token', async () => {
            // Act
            const res = await request(app)
                .get(`/auth/verify-email?token=${verificationToken}`)
                .expect(200);

            // Assert
            expect(res.body.message).to.include('vérifié avec succès');

            // Check user is now verified
            const updatedUser = await User.findByPk(user.id);
            expect(updatedUser.isVerified).to.be.true;
            expect(updatedUser.verificationToken).to.be.null;
        });

        it('should not verify with invalid token', async () => {
            // Act
            const res = await request(app)
                .get('/auth/verify-email?token=invalid-token')
                .expect(404);

            // Assert
            expect(res.body.error).to.include('invalide');
        });

        it('should not verify already verified user', async () => {
            // Arrange - verify user first
            await request(app)
                .get(`/auth/verify-email?token=${verificationToken}`)
                .expect(200);

            // Act - try to verify again
            const res = await request(app)
                .get(`/auth/verify-email?token=${verificationToken}`)
                .expect(400);

            // Assert
            expect(res.body.error).to.include('déjà vérifié');
        });
    });

    describe('Password Reset Email Flow', () => {
        let user;

        beforeEach(async () => {
            // Setup: Create verified user
            const userData = {
                pseudo: 'resettest',
                firstname: 'Reset',
                lastname: 'Test',
                email: 'resettest@test.com',
                password: 'TestPassword123!'
            };

            await request(app)
                .post('/auth/register')
                .send(userData);

            user = await User.findOne({ where: { email: userData.email } });
            // Manually verify user
            await user.update({ isVerified: true, verificationToken: null });
        });

        afterEach(async () => {
            // Cleanup
            if (user) {
                try {
                    await User.destroy({ where: { id: user.id } });
                } catch (error) {
                    // Ignore
                }
            }
        });

        it('should send reset email for existing user', async () => {
            // Act
            const res = await request(app)
                .post('/auth/forgot-password')
                .send({ email: user.email })
                .expect(200);

            // Assert
            expect(res.body.message).to.include('recevrez un lien');
            expect(emailStubs.sendPasswordResetEmail.calledOnce).to.be.true;

            const callArgs = emailStubs.sendPasswordResetEmail.getCall(0).args;
            expect(callArgs[0]).to.equal(user.email);
            expect(callArgs[1]).to.be.a('string'); // reset token
        });

        it('should not reveal if email does not exist', async () => {
            // Act
            const res = await request(app)
                .post('/auth/forgot-password')
                .send({ email: 'nonexistent@test.com' })
                .expect(200);

            // Assert
            expect(res.body.message).to.include('recevrez un lien');
            expect(emailStubs.sendPasswordResetEmail.called).to.be.false;
        });

        it('should reset password with valid token', async () => {
            // Arrange - Request password reset first
            await request(app)
                .post('/auth/forgot-password')
                .send({ email: user.email });

            // Get reset token from database
            const updatedUser = await User.findByPk(user.id);
            const resetToken = updatedUser.resetPasswordToken;

            // Vérifier que le token existe
            expect(resetToken).to.not.be.null;
            expect(resetToken).to.be.a('string');

            // Act
            const res = await request(app)
                .post('/auth/reset-password')
                .send({
                    token: resetToken,
                    newPassword: 'NewPassword123!'
                })
                .expect(200);

            // Assert - Message français
            expect(res.body.message).to.include('réinitialisé avec succès');
            expect(emailStubs.sendPasswordChangeConfirmation.calledOnce).to.be.true;

            const callArgs = emailStubs.sendPasswordChangeConfirmation.getCall(0).args;
            expect(callArgs[0]).to.equal(user.email);
            expect(callArgs[1]).to.equal(user.firstname);
        });

        it('should not reset with expired token', async () => {
            // Arrange - Create expired token
            const expiredDate = new Date(Date.now() - 7200000); // 2 hours ago
            await user.update({
                resetPasswordToken: 'expired-token',
                resetPasswordExpires: expiredDate
            });

            // Act
            const res = await request(app)
                .post('/auth/reset-password')
                .send({
                    token: 'expired-token',
                    newPassword: 'NewPassword123!'
                })
                .expect(404);

            // Assert
            expect(res.body.error).to.include('invalide ou expiré');
            expect(emailStubs.sendPasswordChangeConfirmation.called).to.be.false;
        });

        it('should not reset with missing parameters', async () => {
            // Act - Missing newPassword
            const res = await request(app)
                .post('/auth/reset-password')
                .send({
                    token: 'some-token', // ✅ Virgule ajoutée
                    // newPassword missing
                })
                .expect(400);

            // Assert
            expect(res.body.error).to.include('requis');
        });
    });

    describe('Edge Cases', () => {
        it('should handle email service failures gracefully', async () => {
            // Arrange
            emailStubs.sendVerificationEmail.rejects(new Error('SMTP failure'));

            const testUser = {
                pseudo: 'failtest',
                firstname: 'Fail',
                lastname: 'Test',
                email: 'failtest@example.com',
                password: 'TestPassword123!'
            };

            // Act & Assert
            const res = await request(app)
                .post('/auth/register')
                .send(testUser)
                .expect(500);

            // Cleanup
            try {
                await User.destroy({ where: { email: testUser.email } });
            } catch (error) {
                // Ignore
            }
        });
    });
});
