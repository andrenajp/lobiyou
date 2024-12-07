import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '465', 10),
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendVerificationEmail(to: string, token: string) {
  const info = await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to,
    subject: 'Email de validation',
    text: `Veuillez valider votre email en cliquant sur ce lien: http://localhost:3000/verify?token=${token}`,
    html: `<b>Veuillez valider votre email en cliquant sur ce lien: <a href="http://localhost:3000/verify?token=${token}">Valider mon email</a></b>`,
  });

  console.log('Message sent: %s', info.messageId);
}