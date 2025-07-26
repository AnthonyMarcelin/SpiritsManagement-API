/**
 * Email template
 * @param {string} title
 * @param {string} content
 * @param {string} buttonText
 * @param {string} buttonUrl
 * @param {boolean} isReset
 * @returns {string}
 */
const createEmailTemplate = (title, content, buttonText, buttonUrl, isReset = false) => {
  const primaryColor = isReset ? '#e74c3c' : '#27ae60';
  const backgroundColor = '#f8f9fa';

  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; background-color: ${backgroundColor};">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
                <td style="padding: 40px 20px;">
                    <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                        <!-- Header -->
                        <tr>
                            <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}dd 100%); border-radius: 8px 8px 0 0;">
                                <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">🥃 A ta soif !</h1>
                            </td>
                        </tr>

                        <!-- Content -->
                        <tr>
                            <td style="padding: 40px;">
                                <h2 style="margin: 0 0 20px; color: #2c3e50; font-size: 24px; font-weight: 500;">${title}</h2>
                                ${content}

                                <!-- Button -->
                                <div style="text-align: center; margin: 30px 0;">
                                    <a href="${buttonUrl}"
                                       style="display: inline-block; padding: 16px 32px; background-color: ${primaryColor}; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px; transition: all 0.3s ease;">
                                        ${buttonText}
                                    </a>
                                </div>

                                <div style="margin-top: 20px; padding: 20px; background-color: #f8f9fa; border-radius: 6px; border-left: 4px solid ${primaryColor};">
                                    <p style="margin: 0; color: #6c757d; font-size: 14px;">
                                        <strong>Lien alternatif :</strong><br>
                                        Si le bouton ne fonctionne pas, copiez et collez ce lien dans votre navigateur :
                                    </p>
                                    <p style="margin: 8px 0 0; word-break: break-all; color: #495057; font-size: 14px; font-family: monospace;">
                                        ${buttonUrl}
                                    </p>
                                </div>
                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td style="padding: 20px 40px 40px; text-align: center; border-top: 1px solid #e9ecef;">
                                <p style="margin: 0; color: #6c757d; font-size: 14px;">
                                    Cet email a été envoyé par <strong>A ta soif !</strong><br>
                                    Si vous n'avez pas demandé cette action, ignorez cet email.
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
