import autoBind from "auto-bind";
import AuthService from "./service.js";

class AuthController {
    #authService;

    constructor() {
        autoBind(this);
        this.#authService = new AuthService();
    }

    async registerUser(req, res) {
        try {
            const result = await this.#authService.createUser(req.body);
            if (result) res.status(201).send();
            else res.status(409).json({ message: "Email already exists" });
        } catch (ex) {
            console.log(ex.message);
            res.status(500).json({ message: "Oops, something went wrong" });
        }
    }

    async activate(req, res) {
        try {
            await this.#authService.activate(req.params.id);
            if (req.query.redirect) res.redirect(req.query.redirect);
            else res.status(200).send("Activation success");
        } catch (ex) {
            console.log(ex.message);
            res.status(500).json({ message: "Oops, something went wrong" });
        }
    }

    async login(req, res) {
        const { email, password } = req.body;
        const [token, user, notFound, notVerified] = await this.#authService.login(email, password);

        if (notFound) return res.status(404).json({ message: "Invalid login or password" });
        if (notVerified) return res.status(403).json({ message: "Account is not verified" });
        return res.status(200).json({ token, user });
    }
}

export default new AuthController();
