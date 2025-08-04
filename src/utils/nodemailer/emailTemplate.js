
const createEmailTemplate = (title, content, buttonText, buttonUrl, isWarning = false) => {
  const primaryColor = '#9e4e00';
  const primaryDarkColor = '#7b3c00';
  const secondaryColor = '#fffdf2';
  const accentColor = '#d1bfa7';
  const backgroundColor = '#f9f7ef';
  const warningColor = '#e8a80c';

  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: ${backgroundColor};">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
                <td style="padding: 40px 20px;">
                    <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(123, 60, 0, 0.1);">
                        <!-- Header -->
                        <tr>
                            <td style="padding: 30px 40px 25px; text-align: center; background-color: ${secondaryColor}; border-radius: 12px 12px 0 0; border-bottom: 2px solid ${accentColor};">
                                <h1 style="margin: 0; color: ${primaryDarkColor}; font-size: 28px; font-weight: 700; font-family: 'Poppins', sans-serif;">🥃 À ta soif !</h1>
                            </td>
                        </tr>

                        <!-- Content -->
                        <tr>
                            <td style="padding: 40px;">
                                <h2 style="margin: 0 0 20px; color: ${primaryDarkColor}; font-size: 24px; font-weight: 600; font-family: 'Poppins', sans-serif;">${title}</h2>
                                ${content}

                                <!-- Button -->
                                <div style="text-align: center; margin: 30px 0;">
                                    <a href="${buttonUrl}"
                                       style="display: inline-block; padding: 14px 32px; background-color: ${isWarning ? warningColor : primaryColor}; color: #ffffff; text-decoration: none; border-radius: 10px; font-weight: 600; font-size: 16px; font-family: 'Poppins', sans-serif; box-shadow: 0 2px 6px rgba(123, 60, 0, 0.2);">
                                        ${buttonText}
                                    </a>
                                </div>

                                <div style="margin-top: 25px; padding: 20px; background-color: ${secondaryColor}; border-radius: 10px; border-left: 4px solid ${accentColor};">
                                    <p style="margin: 0; color: ${primaryDarkColor}; font-size: 14px;">
                                        <strong>Lien alternatif :</strong><br>
                                        Si le bouton ne fonctionne pas, copiez et collez ce lien dans votre navigateur :
                                    </p>
                                    <p style="margin: 8px 0 0; word-break: break-all; color: ${primaryColor}; font-size: 14px; font-family: monospace;">
                                        ${buttonUrl}
                                    </p>
                                </div>
                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td style="padding: 25px 40px; text-align: center; border-top: 2px solid ${accentColor}; background-color: ${secondaryColor}; border-radius: 0 0 12px 12px;">
                                <p style="margin: 0; color: #666666; font-size: 14px;">
                                    © ${new Date().getFullYear()} <strong>À ta soif !</strong><br>
                                    Votre collection de spiritueux à portée de main.
                                </p>
                                <p style="margin: 15px 0 0; color: #777777; font-size: 13px;">
                                    Si vous n'avez pas demandé cette action, veuillez ignorer cet email.
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
  `;
};

export default createEmailTemplate;
