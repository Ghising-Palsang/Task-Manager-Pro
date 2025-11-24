const nodemailer = require("nodemailer");
const { SmtpConfig } = require("../config/config");

class EmailService {
  #transport;
  constructor() {
    try {
      this.#transport = nodemailer.createTransport({
        service: SmtpConfig.provider,
        host: SmtpConfig.host,
        port: SmtpConfig.port,
        auth: {
          user: SmtpConfig.user,
          pass: SmtpConfig.password,
        },
      });
    } catch (error) {
      throw {
        message: "Error Connecting to SMTP Server",
        name: "SMTP_SERVER_ERR",
      };
    }
  }

  async sendEmail({
    to,
    sub,
    message,
    cc = null,
    bcc = null,
    attachments = null,
  }) {
    try {
      let msgBody = {
        from: SmtpConfig.from,
        to: to,
        subject: sub,
        html: message,
      };

      if (cc) {
        msgBody["cc"] = cc;
      }

      if (bcc) {
        msgBody["bcc"] = bcc;
      }

      if (attachments) {
        msgBody["attachments"] = attachments;
      }

      let response = await this.#transport.sendMail(msgBody);
      return response;
    } catch (error) {
      throw {
        message: "Email Sending Error",
        name: "EMAIL_SENDING_ERR",
      };
    }
  }
}

module.exports = EmailService;
