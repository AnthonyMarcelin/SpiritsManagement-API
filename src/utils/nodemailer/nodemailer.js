import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587,
    secure: false, // Brevo utilise le port 587 sans SSL
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    }
});

const sendEmail = async (to, subject, text, html) => {
    try {
        const info = await transporter.sendMail({
            from: '"A ta soif !" <atasoif@outlook.fr>',
            to,
            subject,
            text,
            html
        });
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        return info;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};

export default sendEmail;
