import nodemailer from "nodemailer";
import htmlToText from "html-to-text";
import { IUserDocument } from "../types/user";

class Email {
    readonly to: string;
    readonly name: string;
    readonly url: string;
    readonly from: string;

    constructor(user: IUserDocument, url: string) {
        this.to = user.email;
        this.name = user.name;
        this.url = url;
        this.from = `Kaushal Mehta <${process.env.EMAIL_FROM}>`;
    }

    newTransport() {
        if (process.env.NODE_ENV === "production") {
            //sendgrid
            return nodemailer.createTransport({
                service: "sendgrid",
                auth: {
                    user: process.env.SENDGRID_USERNAME,
                    pass: process.env.SENDGRID_PASSWORD,
                },
            });
        }

        return nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT as number | undefined,
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
            text: htmlToText.convert(html),
        };

        await this.newTransport().sendMail(mailOptions);
    }
}

export default Email;
