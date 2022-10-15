"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const html_to_text_1 = __importDefault(require("html-to-text"));
class Email {
    constructor(user, url) {
        this.to = user.email;
        this.name = user.name;
        this.url = url;
        this.from = `Kaushal Mehta <${process.env.EMAIL_FROM}>`;
    }
    newTransport() {
        if (process.env.NODE_ENV === "production") {
            //sendgrid
            return nodemailer_1.default.createTransport({
                service: "sendgrid",
                auth: {
                    user: process.env.SENDGRID_USERNAME,
                    pass: process.env.SENDGRID_PASSWORD,
                },
            });
        }
        return nodemailer_1.default.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
    }
    async sendForgotPassLink() {
        let html;
        html = `<h4>Click on below link or copy or paste to your broswer ${this.url} </h4>
                <a href=${this.url}>Reset Pass</a>
                `;
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject: "Reset Password",
            html,
            text: html_to_text_1.default.convert(html),
        };
        await this.newTransport().sendMail(mailOptions);
    }
}
exports.default = Email;
