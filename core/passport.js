import passport from "passport";
import { BaseModule } from "./server.js";

export default class PassportModule extends BaseModule {
    #strategies;

    constructor(strategies = []) {
        super();
        this.#strategies = strategies;
    }

    async handler(app) {
        app.use(passport.initialize());
    }

    async afterHandler(_) {
        this.#strategies.forEach(({ name, strategy }) => passport.use(name, strategy));
    }
}
