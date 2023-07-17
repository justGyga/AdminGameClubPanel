import argon2 from "argon2";

export const comparePassword = async (password, hash) => {
    return await argon2.verify(hash, password, { type: argon2.argon2d });
};

export const hashPassword = async (user) => {
    user.password = await argon2.hash(user.password, { type: argon2.argon2d });
};
