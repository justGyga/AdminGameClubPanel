import Company from "../models/company.js";
import argon2 from "argon2";
import { TokenGuard } from "../middleware/token-guard.js";
import { Op } from "sequelize";

export default class CompanyService {
    async createCompany(doc) {
        if (await Company.count({ where: { login: { [Op.iLike]: doc.login } }, raw: true })) {
            return false;
        }
        doc.password = await argon2.hash(doc.password);
        await Company.create(doc);
        return {message: "Company was created!"}
    }
}
