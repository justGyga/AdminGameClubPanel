import { DataTypes, Model } from "sequelize";
import { hashPassword } from "../../guards/password.js";

export default class User extends Model {}

export const userPlotter = (sequelize) => {
    User.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            email: {
                type: DataTypes.STRING(150),
                unique: true,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            verified: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }
        },
        { sequelize, tableName: "users" }
    );

    return () => {
        User.addHook("beforeCreate", async (user) => await hashPassword(user));
    };
};
