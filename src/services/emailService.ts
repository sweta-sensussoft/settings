import nodemailer, { SentMessageInfo, TransportOptions } from 'nodemailer';
import ejs from "ejs";
import path from "path";

interface EmailOptions {
  from: string;
  to: string;
  subject: string;
  template: string;
  data: any;
}

const transporterOptions = {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
    logger: true,
  };


const transporter = nodemailer.createTransport(transporterOptions);
// Define a function to send the email
export const sendEmail = async (options: EmailOptions): Promise<void> => {
  try {
    // Read the EJS template file
    const templatePath = path.join(__dirname, `../views/${options.template}`);
    const template = await ejs.renderFile(templatePath, options.data);

    // Configure the email options
    const emailOptions = {
      from: options.from,
      to: options.to,
      subject: options.subject,
      html: template as string,
    };

    // Send the email
    const info: SentMessageInfo = await transporter.sendMail(emailOptions);
  } catch (error) {
    console.error(error);
  }
};