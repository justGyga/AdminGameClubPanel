import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import { resolve } from "path";

const defaultOptions = {
    viewEngine: { defaultLayout: false },
    viewPath: `${resolve()}/modules/mail/views/`,
    extName: ".hbs"
};

export default class Mailer {
    #transport;
    #hbsOptions;

    constructor({ user, clientId, clientSecret, refreshToken, from = null }, hbsOptions = {}) {
        this.#hbsOptions = { ...defaultOptions, ...hbsOptions };
        this.#transport = nodemailer.createTransport({
            pool: true,
            service: "Gmail",
            from: from || user,
            auth: {
                type: "OAuth2",
                user,
                clientId,
                clientSecret,
                refreshToken
            }
        });
    }

    async sendTemplateMail(data, template) {
        this.#transport.use("compile", hbs(this.#hbsOptions));
        await this.#transport.sendMail({ ...data, ...template });
    }

    async sendMail(data) {
        await this.#transport.sendMail({ ...data });
    }
}
