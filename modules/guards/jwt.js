import jwt from "jsonwebtoken";
import _ from "lodash";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";

export const PassportJwt = () => {
    const options = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.TOKEN_SECRET
    };

    return new JwtStrategy(options, async (token, done) => done(null, _.omit(token, "iat", "exp")));
};

export default class TokenService {
    static generateToken(payload) {
        try {
            const expiresIn = process.env.TOKEN_EXPIRE || "7d";
            return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn });
        } catch (ex) {
            throw new Error(ex.message);
        }
    }
}
