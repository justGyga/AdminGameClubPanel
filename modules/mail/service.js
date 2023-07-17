import Mailer from "../../core/mail.js";

export default class MailService {
    #mailer;
    #addressTo;

    constructor() {
        this.#mailer = new Mailer({
            user: process.env.MAIL_USER,
            clientId: process.env.MAIL_CLIENT,
            clientSecret: process.env.MAIL_SECRET,
            refreshToken: process.env.MAIL_TOKEN,
            from: "noreply-system@info.com"
        });
    }

    sendTo(addressTo) {
        this.#addressTo = addressTo;
        return this;
    }

    async activate(link) {
        const template = {
            template: "activate",
            context: { link }
        };
        await this.#mailer.sendTemplateMail(
            {
                to: this.#addressTo,
                subject: "Регистрация в системе"
            },
            template
        );
    }
}
