import Company from "../models/company.js";
import argon2 from "argon2";
import { TokenGuard } from "../common/middleware/token-guard.js";
import { Op } from "sequelize";
import { ACCOUNT_TYPE } from "../common/vars/enums.js";

export default class CompanyService {
    async createCompany(doc) {
        if (await Company.count({ where: { login: { [Op.iLike]: doc.login } }, raw: true })) {
            return false;
        }
        doc.password = await argon2.hash(doc.password);
        const company = await Company.create(doc);
        return company;
    }

    async authCompany(doc) {
        const companyFindStatus = await Company.findOne({
            where: {
                login: { [Op.iLike]: doc.login }
            },
            raw: true
        });
        if (!companyFindStatus || !(await argon2.verify(companyFindStatus.password, doc.password))) return false;
        return await TokenGuard.generate({ id: companyFindStatus.id, type: ACCOUNT_TYPE.COMPANY });
    }

    async editCompanyName(id, data) {
        await Company.update(data, { where: { id } });
    }

    async deleteCompany(id) {
        await Company.destroy({ where: { id } });
    }
}
