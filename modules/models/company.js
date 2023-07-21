import { DataTypes, Model } from "sequelize";

export default class Company extends Model {}

export const companyInitter = (sequelize) => {
    Company.init(
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
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        { sequelize, tableName: "companies" }
    );

    return () => {};
};
