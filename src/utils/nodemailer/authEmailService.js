import createEmailTemplate from "./emailTemplate.js";
import sendEmail from "./nodemailer.js";

const BASE_URL = process.env.FRONT_URL || "http://localhost:3000";

// Couleurs de la charte graphique pour personnaliser le contenu des emails
const colors = {
  primaryColor: '#9e4e00',
  primaryDarkColor: '#7b3c00',
  secondaryColor: '#fffdf2',
  accentColor: '#d1bfa7',
  warningColor: '#e8a80c',
  warningBg: '#fff9e6',
  warningBorder: '#ffeeba',
  successColor: '#5a7052',
  successBg: '#e9f5e6',
  successBorder: '#c3e6cb',
  textColor: '#4a4a4a'
};

/**
 * Email send verification
 * @param {string} email
 * @param {string} firstname
 * @param {string} verificationToken
 * @return {Promise}
 */
const sendVerificationEmail = async (email, firstname, verificationToken) => {
    try {
        const verificationUrl = `${BASE_URL}/email-verified?token=${verificationToken}`;

        const emailSubject = "Vérification de votre compte À ta soif !";

        const emailContent = `
            <p style="margin: 0 0 15px; color: ${colors.textColor}; font-size: 16px; line-height: 1.6; font-family: 'Inter', sans-serif;">
                Bonjour <strong>${firstname}</strong> ! 👋
            </p>
            <p style="margin: 0 0 15px; color: ${colors.textColor}; font-size: 16px; line-height: 1.6; font-family: 'Inter', sans-serif;">
                Merci de vous être inscrit sur <strong>À ta soif !</strong> Nous sommes ravis de vous accueillir dans notre communauté.
            </p>
            <p style="margin: 0 0 15px; color: ${colors.textColor}; font-size: 16px; line-height: 1.6; font-family: 'Inter', sans-serif;">
                Pour commencer à ajouter vos fûts favoris et explorer votre collection, veuillez d'abord vérifier votre adresse email en cliquant sur le bouton ci-dessous :
            </p>
            <div style="margin: 20px 0; padding: 15px; background-color: ${colors.successBg}; border: 1px solid ${colors.successBorder}; border-radius: 10px;">
                <p style="margin: 0; color: ${colors.successColor}; font-size: 14px; font-family: 'Inter', sans-serif;">
                    🎉 <strong>Bienvenue !</strong> Une fois votre email vérifié, vous pourrez pleinement profiter de notre application.
                </p>
            </div>
        `;

        const emailText = `Bienvenue ${firstname} ! Cliquez sur ce lien pour vérifier votre compte : ${verificationUrl}`;

        const emailHTML = createEmailTemplate(
            "Bienvenue dans notre communauté !",
            emailContent,
            "Vérifier mon compte",
            verificationUrl,
            false
        );

        return await sendEmail(email, emailSubject, emailText, emailHTML);

    } catch (error) {

        console.error("Error sending verification email:", error);

        throw new Error("Failed to send verification email");
    }
};

/**
 * Reset password email
 * @param {string} email
 * @param {string} resetToken
 * @returns {Promise}
 */
const sendPasswordResetEmail = async (email, resetToken) => {
    try {
        const resetUrl = `${BASE_URL}/reset-password?token=${resetToken}`;

        const emailSubject = "Réinitialisation de votre mot de passe - À ta soif !";

        const emailContent = `
            <p style="margin: 0 0 15px; color: ${colors.textColor}; font-size: 16px; line-height: 1.6; font-family: 'Inter', sans-serif;">
                Vous avez demandé une réinitialisation de votre mot de passe pour votre compte <strong>À ta soif !</strong>
            </p>
            <p style="margin: 0 0 15px; color: ${colors.textColor}; font-size: 16px; line-height: 1.6; font-family: 'Inter', sans-serif;">
                Cliquez sur le bouton ci-dessous pour créer un nouveau mot de passe :
            </p>
            <div style="margin: 20px 0; padding: 15px; background-color: ${colors.warningBg}; border: 1px solid ${colors.warningBorder}; border-radius: 10px;">
                <p style="margin: 0; color: ${colors.warningColor}; font-size: 14px; font-family: 'Inter', sans-serif;">
                    ⏰ <strong>Important :</strong> Ce lien expire dans <strong>1 heure</strong> pour votre sécurité.
                </p>
            </div>
        `;

        const emailText = `Vous avez demandé une réinitialisation de mot de passe. Cliquez sur ce lien : ${resetUrl}`;

        const emailHtml = createEmailTemplate(
            "Réinitialisation de votre mot de passe",
            emailContent,
            "Réinitialiser mon mot de passe",
            resetUrl,
            true
        );

        const result = await sendEmail(email, emailSubject, emailText, emailHtml);

        return result;
    } catch (error) {
        console.error("[sendPasswordResetEmail] Erreur lors de l'envoi:", error);
        throw new Error("Failed to send password reset email");
    }
};

/**
 * Reset confirmation email
 * @param {string} email
 * @param {string} firstname
 * @returns {Promise}
 */
const sendPasswordChangeConfirmation = async (email, firstname) => {
    try {

        const emailSubject = "Mot de passe modifié - À ta soif !";

        const emailContent = `
            <p style="margin: 0 0 15px; color: ${colors.textColor}; font-size: 16px; line-height: 1.6; font-family: 'Inter', sans-serif;">
                Bonjour <strong>${firstname}</strong>,
            </p>
            <p style="margin: 0 0 15px; color: ${colors.textColor}; font-size: 16px; line-height: 1.6; font-family: 'Inter', sans-serif;">
                Votre mot de passe a été modifié avec succès sur <strong>À ta soif !</strong>
            </p>
            <p style="margin: 0 0 15px; color: ${colors.textColor}; font-size: 16px; line-height: 1.6; font-family: 'Inter', sans-serif;">
                Si vous n'êtes pas à l'origine de cette modification, contactez-nous immédiatement.
            </p>
            <div style="margin: 20px 0; padding: 15px; background-color: ${colors.successBg}; border: 1px solid ${colors.successBorder}; border-radius: 10px;">
                <p style="margin: 0; color: ${colors.successColor}; font-size: 14px; font-family: 'Inter', sans-serif;">
                    🔒 <strong>Sécurité :</strong> Votre compte est maintenant sécurisé avec votre nouveau mot de passe.
                </p>
            </div>
        `;

        const emailText = `Bonjour ${firstname}, votre mot de passe a été modifié avec succès.`;

        const emailHtml = createEmailTemplate(
            "Mot de passe modifié",
            emailContent,
            "Accéder à mon compte",
            `${BASE_URL}/login`,
            false
        );

        return await sendEmail(email, emailSubject, emailText, emailHtml);

    } catch (error) {

        console.error("Error sending password change confirmation email:", error);

        throw new Error("Failed to send password change confirmation email");

    }
};

export {
    sendVerificationEmail,
    sendPasswordResetEmail,
    sendPasswordChangeConfirmation
};
