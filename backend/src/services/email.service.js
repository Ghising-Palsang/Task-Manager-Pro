const { Resend } = require("resend");
const { ResendConfig } = require("../config/config");


const resend = new Resend(ResendConfig.apiKey);

class EmailService {
  async sendEmail({ to, subject, html }) {
    try {
      const response = await resend.emails.send({
        from: "Task Manager <onboarding@resend.dev>",
        to: to,
        subject: subject,
        html: html,
      });

      console.log("Email sent:", response);
      return response;
    } catch (error) {
      console.error("Email error:", error);
    }
  }
}

const emailSvc = new EmailService()

module.exports = emailSvc;
