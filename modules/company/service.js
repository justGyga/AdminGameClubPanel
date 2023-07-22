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
        return { message: "Company was created!" };
    }

    async authCompany(doc) {
        const companyFindStatus = await Company.findOne({
            where: {
                login: { [Op.iLike]: doc.login }
            },
            raw: true
        });
        if (!companyFindStatus || !(await argon2.verify(companyFindStatus.password, doc.password))) return false;
        return await TokenGuard.generate({ id: companyFindStatus.id, type: "Company" });
    }

    async editCompanyName(doc) {
        const companyFindStatus = await Company.findByPk(doc.companyId);
        if (!companyFindStatus) {
            return false;
        }
        if (doc.newLogin) {
            companyFindStatus.login = doc.newLogin
        }
        if (doc.newName) {
            companyFindStatus.name = doc.newName
        }
        return await companyFindStatus.save();
    }

    async deleteCompany(id){
        Company.destroy({ where: { id } });
    }

}
