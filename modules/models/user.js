import { DataTypes, Model } from "sequelize";

export default class User extends Model { }

export const userInitter = (sequelize) => {
    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            login: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        { sequelize, tableName: "users" }
    );

    return () => {};
};