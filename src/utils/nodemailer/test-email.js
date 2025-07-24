import sendEmail from './nodemailer.js';

const testEmail = async () => {
    try {
        await sendEmail(
            "test@example.com",
            "Test SpiritManagement",
            "Test email",
            "<b>Test email from SpiritManagement</b>"
        );
        console.log("Email envoyé avec succès !");
    } catch (error) {
        console.error("Erreur:", error);
    }
};

testEmail();
