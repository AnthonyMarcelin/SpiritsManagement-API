import { expect } from 'chai';
import request from 'supertest';

import app from '../../../../index.js';
import User from '../../../models/user.model.js';

describe('Email Integration Tests - Simple', () => {

    describe('Registration Flow', () => {
        const testUser = {
            pseudo: 'integrationtest',
            firstname: 'Integration',
            lastname: 'Test',
            email: 'integrationtest@example.com',
            password: 'TestPassword123!'
        };

        afterEach(async () => {
            // Cleanup - supprime l'utilisateur de test
            try {
                await User.destroy({ where: { email: testUser.email } });
            } catch (error) {
                // Ignorer si l'utilisateur n'existe pas
            }
        });

        it('should register user and create verification token', async () => {
            // Act
            const res = await request(app)
                .post('/api/auth/register')
                .send(testUser)
                .expect(201);

            // Assert
            expect(res.body.message).to.include('Vérifiez votre email');

            // Vérifier que l'utilisateur existe en DB avec un token
            const user = await User.findOne({ where: { email: testUser.email } });
            expect(user).to.not.be.null;
            expect(user.isVerified).to.be.false;
            expect(user.verificationToken).to.not.be.null;
            expect(user.verificationToken).to.be.a('string');
        });

        it('should not register user with invalid data', async () => {
            // Arrange - utilisateur avec données invalides
            const invalidUser = { ...testUser, password: '123' };

            // Act
            const res = await request(app)
                .post('/api/auth/register')
                .send(invalidUser)
                .expect(400);

            // Assert
            expect(res.body.error).to.exist;

            // Vérifier qu'aucun utilisateur n'a été créé
            const user = await User.findOne({ where: { email: invalidUser.email } });
            expect(user).to.be.null;
        });
    });

    describe('Email Verification Flow', () => {
        let user;
        let verificationToken;

        beforeEach(async () => {
            // Setup: Créer un utilisateur non vérifié
            const userData = {
                pseudo: 'verificationtest',
                firstname: 'Verification',
                lastname: 'Test',
                email: 'verificationtest@test.com',
                password: 'TestPassword123!'
            };

            await request(app)
                .post('/api/auth/register')
                .send(userData);

            // Récupérer l'utilisateur et son token
            user = await User.findOne({ where: { email: userData.email } });
            verificationToken = user.verificationToken;
        });

        afterEach(async () => {
            // Cleanup
            if (user) {
                try {
                    await User.destroy({ where: { id: user.id } });
                } catch (error) {
                    // Ignorer
                }
            }
        });

        it('should verify email with valid token', async () => {
            // Act
            const res = await request(app)
                .get(`/api/auth/verify-email?token=${verificationToken}`)
                .expect(200);

            // Assert
            expect(res.body.message).to.include('vérifié avec succès');

            // Vérifier que l'utilisateur est maintenant vérifié
            const updatedUser = await User.findByPk(user.id);
            expect(updatedUser.isVerified).to.be.true;
            expect(updatedUser.verificationToken).to.be.null;
        });

        it('should not verify with invalid token', async () => {
            // Act
            const res = await request(app)
                .get('/api/auth/verify-email?token=invalid-token')
                .expect(404);

            // Assert
            expect(res.body.error).to.include('invalide');
        });
    });

    describe('Password Reset Flow', () => {
        let user;

        beforeEach(async () => {
            // Setup: Créer un utilisateur vérifié
            const userData = {
                pseudo: 'passwordtest',
                firstname: 'Password',
                lastname: 'Test',
                email: 'passwordtest@test.com',
                password: 'TestPassword123!'
            };

            await request(app)
                .post('/api/auth/register')
                .send(userData);

            user = await User.findOne({ where: { email: userData.email } });
            // Vérifier manuellement l'utilisateur
            await user.update({ isVerified: true, verificationToken: null });
        });

        afterEach(async () => {
            // Cleanup
            if (user) {
                try {
                    await User.destroy({ where: { id: user.id } });
                } catch (error) {
                    // Ignorer
                }
            }
        });

        it('should generate reset token for existing user', async () => {
            // Act
            const res = await request(app)
                .post('/api/auth/forgot-password')
                .send({ email: user.email })
                .expect(200);

            // Assert
            expect(res.body.message).to.include('recevrez un lien');

            // Vérifier que le token de reset a été généré
            const updatedUser = await User.findByPk(user.id);
            expect(updatedUser.resetPasswordToken).to.not.be.null;
            expect(updatedUser.resetPasswordExpires).to.not.be.null;
        });

        it('should reset password with valid token', async () => {
            // Arrange - Demander un reset de mot de passe d'abord
            await request(app)
                .post('/api/auth/forgot-password')
                .send({ email: user.email });

            // Récupérer le token de reset depuis la DB
            const updatedUser = await User.findByPk(user.id);
            const resetToken = updatedUser.resetPasswordToken;

            // Act
            const res = await request(app)
                .post('/api/auth/reset-password')
                .send({
                    token: resetToken,
                    newPassword: 'NewPassword123!'
                })
                .expect(200);

            // Assert
            expect(res.body.message).to.include('réinitialisé avec succès');
        });
    });
});
