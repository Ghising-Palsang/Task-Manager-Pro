const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

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
