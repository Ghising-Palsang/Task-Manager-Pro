const { AppConfig } = require("../../config/config");
const EmailService = require("../../services/email.service");

class AuthMail extends EmailService {
  async notifyAccountActivation(user) {
    try {
      const activationLink = `${AppConfig.feUrl}activate?token=${user.activationToken}`;
      const message  = `
      <div style="background-color:#f4f6f8;padding:30px;font-family:Arial,Helvetica,sans-serif;color:#333;">
        <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e6e9ee;">
          <div style="background:#0b5ed7;color:#ffffff;padding:20px 30px;">
            <h1 style="margin:0;font-size:20px;font-weight:600;">Activate Your Account</h1>
          </div>
          <div style="padding:30px;">
            <p style="margin:0 0 16px 0;font-size:15px;line-height:1.5;">
              Dear ${user.name || user.email},
            </p>
            <p style="margin:0 0 16px 0;font-size:15px;line-height:1.5;">
              Thank you for registering with us. To complete your account setup and activate your access, please click the button below:
            </p>
            <p style="text-align:center;margin:25px 0;">
              <a href="${activationLink}" style="display:inline-block;padding:12px 22px;background:#0b5ed7;color:#ffffff;text-decoration:none;border-radius:6px;font-weight:600;">
                Activate Account
              </a>
            </p>
            <p style="margin:0 0 8px 0;font-size:13px;color:#6b6f76;">
              If the button does not function in your email client, copy and paste the following link into your browser:
            </p>
            <p style="word-break:break-all;font-size:13px;color:#0b5ed7;">
              <a href="${activationLink}" style="color:#0b5ed7;text-decoration:underline;">${activationLink}</a>
            </p>
            <p style="margin-top:20px;font-size:13px;color:#6b6f76;">
              If you did not request this account, please ignore this message. For security, this link will expire after a short period.
            </p>
            <p style="margin-top:24px;font-size:13px;color:#6b6f76;">
              Sincerely,<br/>
              The Team
            </p>
          </div>
          <div style="background:#f1f3f5;padding:12px 30px;text-align:center;font-size:12px;color:#9aa0a6;">
            © ${new Date().getFullYear()} Company. All rights reserved.
          </div>
        </div>
      </div>
                `
      await this.sendEmail({
        to: user.email,
        sub: "Activate Your Account",
        message
      });
    } catch (error) {
      throw error;
    }
  }
}

const authMailSvc = new AuthMail();
module.exports = authMailSvc;
