import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
	host: "smtp.ethereal.email",
	port: 587,
	secure: false, // true for 465, false for other ports
	auth: {
		user: process.env.SMTP_USER || "icie36@ethereal.email",
		pass: process.env.SMTP_PASS || "xbvnH9f6DWD7rN33SJ",
	}
})

const sendEmail = async (to, subject, text, html) => {
    try {
        const info = await transporter.sendMail({
            from: '"A ta soif !" <noreply@atasoif.com>',
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
