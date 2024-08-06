import nodemailer from "nodemailer";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

// export async function sendEmail({ to, subject, html }: EmailOptions) {
//   try {
//     console.log("file: email.ts:11  process.env.SENDGRID_API_KEY", process.env.SENDGRID_API_KEY);
//     sgMail.setTwilioEmailAuth("apikey", process.env.SENDGRID_API_KEY!);
//     if (!process.env.SENDGRID_FROM_EMAIL) return { message: "SENDGRID creds not found" };
//     const msg = { to, from: process.env.SENDGRID_FROM_EMAIL, subject, html };
//     const result = await sgMail.send(msg);
//     return {
//       message: `Email sent successfully to ${to}`,
//       data: { ...result[0], ...result[1] }
//     };
//   } catch (error: any) {
//     return {
//       message: error.message,
//       error: error?.response?.body?.errors ?? error.message
//     };
//   }
// }

// export async function sendEmail2({ to, subject, html }: EmailOptions) {
//   const config = new Configuration({ apiKey: process.env.ELASTIC_API_KEY });
//   const emailsApi = new EmailsApi(config);

//   const emailMessageData: EmailMessageData = {
//     Recipients: [{ Email: to }],
//     Content: {
//       Body: [
//         {
//           ContentType: "HTML",
//           Charset: "utf-8",
//           Content: html
//         },
//         // {
//         //   ContentType: "PlainText",
//         //   Charset: "utf-8",
//         //   Content: html
//         // }
//       ],
//       From: process.env.SENDGRID_FROM_EMAIL,
//       Subject: subject
//     }
//   };

//   return emailsApi
//     .emailsPost(emailMessageData)
//     .then((response) => response.data)
//     .catch((error) => error);
// }

export async function sendEmail({ to, subject, html }: EmailOptions) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASSWORD }
    });

    const mailOptions = { from: process.env.EMAIL_USER, to, subject, html };
    const info = await transporter.sendMail(mailOptions);

    return { message: `Email sent successfully to ${to}`, data: info };
  } catch (error: any) {
    return { message: error.message, error };
  }
}