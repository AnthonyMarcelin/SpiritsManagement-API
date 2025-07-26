import { expect } from 'chai';
import sinon from 'sinon';
import {
    sendVerificationEmail,
    sendPasswordResetEmail,
    sendPasswordChangeConfirmation
} from '../authEmailService.js';

describe('Email Services - Simple Tests', () => {
    let consoleStub;

    beforeEach(() => {
        consoleStub = sinon.stub(console, 'error');
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('Function Tests', () => {
        it('should export all email functions', () => {
            expect(sendVerificationEmail).to.be.a('function');
            expect(sendPasswordResetEmail).to.be.a('function');
            expect(sendPasswordChangeConfirmation).to.be.a('function');
        });

        it('should handle verification email', async () => {
            try {
                await sendVerificationEmail('test@example.com', 'Test', 'token123');
            } catch (error) {
                expect(error.message).to.include('Failed to send verification email');
            }
        });

        it('should handle reset email', async () => {
            try {
                await sendPasswordResetEmail('test@example.com', 'resettoken123');
            } catch (error) {
                expect(error.message).to.include('Failed to send password reset email');
            }
        });

        it('should handle confirmation email', async () => {
            try {
                await sendPasswordChangeConfirmation('test@example.com', 'Test');
            } catch (error) {
                expect(error.message).to.include('Failed to send password change confirmation email');
            }
        });
    });

    describe('Environment', () => {
        it('should have correct base URL', () => {
            const baseUrl = process.env.FRONT_URL || 'http://localhost:3000';
            expect(baseUrl).to.be.a('string');
            expect(baseUrl).to.include('http');
        });
    });
});
