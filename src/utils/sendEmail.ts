import nodemailer from 'nodemailer';
import logger from './logger';

let transporter: nodemailer.Transporter;

const initTransporter = async () => {
  if (transporter) return;

  if (process.env.NODE_ENV === 'production') {
    // For production, use Gmail with App Password instead of regular password
    transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587', 10),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        // Use App Password instead of regular password for Gmail
        pass: process.env.EMAIL_APP_PASSWORD || process.env.EMAIL_PASS,
      },
    });
    logger.debug('Nodemailer production transporter auth:', {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD || process.env.EMAIL_PASS ? '********' : 'undefined',
    });
  } else {
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    logger.debug('Nodemailer development transporter auth:', {
      user: testAccount.user,
      pass: testAccount.pass ? '********' : 'undefined',
    });
    logger.info('Test email account created', {
      user: testAccount.user,
      pass: testAccount.pass,
      url: 'https://ethereal.email',
    });
  }

  // Verify the connection configuration
  try {
    await transporter.verify();
    logger.info('SMTP connection verified successfully');
  } catch (error: any) {
    logger.error('SMTP connection verification failed:', {
      error: error.message,
      stack: error.stack,
    });
  }
};

interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html: string;
}

export const sendEmail = async (options: EmailOptions) => {
  if (!transporter) {
    await initTransporter();
  }

  try {
    logger.debug('Sending email', { to: options.to, subject: options.subject });

    const mailOptions = {
      from: process.env.EMAIL_FROM || 'noreply@example.com',
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    };

    const info = await transporter.sendMail(mailOptions);

    if (process.env.NODE_ENV !== 'production') {
      logger.info('Email preview URL', {
        previewUrl: nodemailer.getTestMessageUrl(info),
        to: options.to,
      });
    }

    logger.debug('Email sent successfully', { messageId: info.messageId });
    return info;
  } catch (error: any) {
    logger.error('Error sending email:', {
      error: error.message,
      stack: error.stack,
      to: options.to,
    });
    throw new Error('Failed to send email');
  }
};

// Initialize the transporter when the module is loaded
initTransporter();