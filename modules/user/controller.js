import autoBind from "auto-bind";
import UserService from "./service.js";

class UserController {
    #userService;

    constructor() {
        autoBind(this);
        this.#userService = new UserService();
    }

    async registration(req, res) {
        try {
            const result = await this.#userService.createUser(req.body);
            if (result) return res.status(201).json(result);
            res.status(409).json({ message: `User ${req.body.login} already exist` });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Ops! Something went wrong!" });
        }
    }

    async authorization(req, res) {
        try {
            const result = await this.#userService.authUser(req.body);
            if (!result) {
                return res.status(404).json({ message: "Login or password isn't correct" });
            }
            res.status(200).json({ message: "All is correct", token: result });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Ops! Something went wrong!" });
        }
    }

    async edit(req, res) {
        try {
            await this.#userService.editLogin({ userId: req.owner.id, newLogin: req.body.newLogin });
            res.status(200).json({ message: "Login was edited!" });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Ops! Something went wrong!" });
        }
    }

    async delete(req, res) {
        await this.#userService.deleteUser(req.owner.id);
        res.status(204).send();
    }
}

export default new UserController();
