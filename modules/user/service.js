import User from "../models/user.js";
import argon2, { argon2d } from "argon2";
import _ from "lodash";
import { TokenGuard } from "../middleware/token-guard.js";
import { Op } from "sequelize";

export default class UserService {
    async createUser(doc) {
        if (!(await User.count({ where: { login: { [Op.iLike]: doc.login } }, raw: true }))) {
            return false;
        }
        doc.password = await argon2.hash(doc.password);
        await User.create(doc);
        return {message: "User was created!" };
    }

    async loginUser(doc) {
        const userFindStatus = await User.findOne({
            where: {
                login: { [Op.iLike]: doc.login }
            },
            raw: true
        });
        if (!userFindStatus || !(await argon2.verify(userFindStatus.password, doc.password))) return false;
        return await TokenGuard.generate({ id: userFindStatus.id });
    }

    async editLogin(doc) {
        const userFindStatus = await User.findByPk(doc.userId);
        if (!userFindStatus) {
            return false;
        }
        userFindStatus.login = doc.newLogin;
        return await userFindStatus.save();
    }

    async deleteUser(id) {
        User.destroy({ where: { id } });
    }
}
