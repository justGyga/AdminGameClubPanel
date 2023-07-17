import _ from "lodash";
import { Op } from "sequelize";
import TokenService from "../guards/jwt.js";
import { comparePassword } from "../guards/password.js";
import MailService from "../mail/service.js";
import User from "./models/user.js";

class AuthService {
    async createUser(doc) {
        if (await User.count({ where: { email: { [Op.iLike]: doc.email } } })) return false;
        const { id, email } = await User.build(doc).save();
        new MailService().sendTo(email).activate(`${process.env.APP_DOMAIN}/auth/activate/${id}`);
        return true;
    }

    async activate(id) {
        await User.update({ verified: true }, { where: { id } });
    }

    async login(email, password) {
        const user = await User.findOne({ where: { email: { [Op.iLike]: email } }, attributes: { exclude: ["createdAt", "updatedAt"] } });
        if (!user || !(await comparePassword(password, user.password))) return [null, null, true, false];
        if (!user.verified) return [null, null, false, true];

        const token = TokenService.generateToken({ id: user.id });
        return [token, _.omit(user, "password", "verified"), false, false];
    }
}

export default AuthService;
