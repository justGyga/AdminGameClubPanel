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
            const isCompanyCreated = await this.#companyService.createCompany(req.body);
            if (!isCompanyCreated) return res.status(409).json({ message: `Company with login "${req.body.login}" already exist` });
            res.status(201).json(isCompanyCreated);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Ops! Something went wrong!" });
        }
    }

    async authorization(req, res) {
        try {
            const isAuthSuccess = await this.#companyService.authCompany(req.body);
            if (!isAuthSuccess) {
                return res.status(404).json({ message: "Login or password isn't correct" });
            }
            res.status(200).json({ message: "All is correct", token: isAuthSuccess });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Ops! Something went wrong!" });
        }
    }

    async edit(req, res) {
        try {
            await this.#companyService.editCompanyName(req.owner.id, req.body);
            res.status(200).json({ message: "Your data was edit successfully!" });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Ops! Something went wrong!" });
        }
    }

    async delete(req, res) {
        await this.#companyService.deleteCompany(req.owner.id);
        res.status(204).send();
    }
}

export default new CompanyController();
