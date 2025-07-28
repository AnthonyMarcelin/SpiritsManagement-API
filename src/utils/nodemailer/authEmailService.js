import sendEmail from "./nodemailer.js";
import createEmailTemplate from "./emailTemplate.js";

const BASE_URL = process.env.FRONT_URL || "http://localhost:3000";

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

        const emailSubject = "Vérification de votre compte A ta soif !";

        const emailContent = `
            <p style="margin: 0 0 15px; color: #495057; font-size: 16px; line-height: 1.6;">
                Bonjour <strong>${firstname}</strong> ! 👋
            </p>
            <p style="margin: 0 0 15px; color: #495057; font-size: 16px; line-height: 1.6;">
                Merci de vous être inscrit sur <strong>A ta soif !</strong> Nous sommes ravis de vous accueillir dans notre communauté.
            </p>
            <p style="margin: 0 0 15px; color: #495057; font-size: 16px; line-height: 1.6;">
                Pour commencer à ajouter vos fûts favoris et explorer votre collection, veuillez d'abord vérifier votre adresse email en cliquant sur le bouton ci-dessous :
            </p>
        `;

        const emailText = `Bienvenue ${firstname} ! Cliquez sur ce lien pour vérifier votre compte : ${verificationUrl}`;

        const emailHTML = createEmailTemplate(
            "Bienvenue dans notre communauté !",
            emailContent,
            "Vérifier mon compte",
            verificationUrl
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
        console.log("[sendPasswordResetEmail] Appel avec :", { email, resetToken, resetUrl });

        const emailSubject = "Réinitialisation de votre mot de passe - A ta soif !";

        const emailContent = `
            <p style="margin: 0 0 15px; color: #495057; font-size: 16px; line-height: 1.6;">
                Vous avez demandé une réinitialisation de votre mot de passe pour votre compte <strong>A ta soif !</strong>
            </p>
            <p style="margin: 0 0 15px; color: #495057; font-size: 16px; line-height: 1.6;">
                Cliquez sur le bouton ci-dessous pour créer un nouveau mot de passe :
            </p>
            <div style="margin: 20px 0; padding: 15px; background-color: #fff3cd; border: 1px solid #ffeeba; border-radius: 6px;">
                <p style="margin: 0; color: #856404; font-size: 14px;">
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
        console.log("[sendPasswordResetEmail] Résultat de sendEmail:", result);
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
        const emailSubject = "Mot de passe modifié - A ta soif !";

        const emailContent = `
            <p style="margin: 0 0 15px; color: #495057; font-size: 16px; line-height: 1.6;">
                Bonjour <strong>${firstname}</strong>,
            </p>
            <p style="margin: 0 0 15px; color: #495057; font-size: 16px; line-height: 1.6;">
                Votre mot de passe a été modifié avec succès sur <strong>A ta soif !</strong>
            </p>
            <p style="margin: 0 0 15px; color: #495057; font-size: 16px; line-height: 1.6;">
                Si vous n'êtes pas à l'origine de cette modification, contactez-nous immédiatement.
            </p>
            <div style="margin: 20px 0; padding: 15px; background-color: #d1ecf1; border: 1px solid #bee5eb; border-radius: 6px;">
                <p style="margin: 0; color: #0c5460; font-size: 14px;">
                    🔒 <strong>Sécurité :</strong> Votre compte est maintenant sécurisé avec votre nouveau mot de passe.
                </p>
            </div>
        `;

        const emailText = `Bonjour ${firstname}, votre mot de passe a été modifié avec succès.`;

        const emailHtml = createEmailTemplate(
            "Mot de passe modifié",
            emailContent,
            "Accéder à mon compte",
            `${BASE_URL}/login`
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
