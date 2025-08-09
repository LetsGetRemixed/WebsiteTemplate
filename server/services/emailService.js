import nodemailer from 'nodemailer';

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransporter({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendEmail(to, subject, html, text) {
    try {
      const mailOptions = {
        from: process.env.EMAIL_FROM,
        to,
        subject,
        html,
        text,
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent:', info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('Email sending failed:', error);
      throw error;
    }
  }

  async sendPasswordReset(email, resetToken) {
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
    
    const html = `
      <h1>Password Reset Request</h1>
      <p>You requested a password reset for your account.</p>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}" style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Reset Password</a>
      <p>If you didn't request this, please ignore this email.</p>
      <p>This link will expire in 1 hour.</p>
    `;

    const text = `
      Password Reset Request
      
      You requested a password reset for your account.
      Click the link below to reset your password:
      ${resetUrl}
      
      If you didn't request this, please ignore this email.
      This link will expire in 1 hour.
    `;

    return this.sendEmail(email, 'Password Reset Request', html, text);
  }

  async sendWelcomeEmail(email, name) {
    const html = `
      <h1>Welcome to Website Template!</h1>
      <p>Hi ${name},</p>
      <p>Thank you for joining our platform. We're excited to have you on board!</p>
      <p>If you have any questions, feel free to reach out to our support team.</p>
      <p>Best regards,<br>The Website Template Team</p>
    `;

    const text = `
      Welcome to Website Template!
      
      Hi ${name},
      
      Thank you for joining our platform. We're excited to have you on board!
      
      If you have any questions, feel free to reach out to our support team.
      
      Best regards,
      The Website Template Team
    `;

    return this.sendEmail(email, 'Welcome to Website Template!', html, text);
  }

  async sendNotificationEmail(email, subject, message) {
    const html = `
      <h1>${subject}</h1>
      <p>${message}</p>
      <p>Best regards,<br>The Website Template Team</p>
    `;

    const text = `
      ${subject}
      
      ${message}
      
      Best regards,
      The Website Template Team
    `;

    return this.sendEmail(email, subject, html, text);
  }
}

export default new EmailService();
