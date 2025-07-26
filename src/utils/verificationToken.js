import crypto from 'crypto';

function generateVerificationToken() {
  return crypto.randomBytes(32).toString('hex');
}

function generateResetPasswordToken() {
  return crypto.randomBytes(32).toString('hex');
}

export default {
  generateVerificationToken,
  generateResetPasswordToken,
};
