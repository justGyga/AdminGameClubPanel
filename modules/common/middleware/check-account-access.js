import { ACCOUNT_TYPE } from "../vars/enums.js";

/**
 * Validate type of account
 * @param {"Company" | "User"} role
 */
export const checkRole =
    (role = ACCOUNT_TYPE.USER) =>
    async (req, res, next) => {
        if (req.owner.type !== role) {
            return res.status(401).json({ message: `You are not a ${role}` });
        }
        next();
    };
