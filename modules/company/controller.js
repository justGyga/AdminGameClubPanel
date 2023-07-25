import autoBind from "auto-bind";
import CompanyService from "./service.js";

class CompanyController {
    #companyService;

    constructor() {
        autoBind(this);
        this.#companyService = new CompanyService();
    }

    async registration(req, res) {
        try {
            const result = await this.#companyService.createCompany(req.body);
            if (result) return res.status(201).json(result);
            res.status(409).json({ message: `Company with login "${req.body.login}" already exist` });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Ops! Something went wrong!" });
        }
    }

    async authorization(req, res) {
        try {
            const result = await this.#companyService.authCompany(req.body);
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
            if (req.owner.type !== "Company") {
                return res.status(401).json({ message: "Your data is not belong to any Company" });
            }
            await this.#companyService.editCompanyName(req.owner.id, { login: req.body.login, name: req.body.name });
            res.status(200).json({ message: "Your data was edit successfully!" });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Ops! Something went wrong!" });
        }
    }

    async delete(req, res) {
        console.log(req.owner);
        if (req.owner.type !== "Company") {
            return res.status(401).json({ message: "Your data is not belong to any Company" });
        }
        await this.#companyService.deleteCompany(req.owner.id);
        res.status(204).send();
    }
}

export default new CompanyController();
