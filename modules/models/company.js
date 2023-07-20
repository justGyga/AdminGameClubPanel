import { DataTypes, Model } from "sequelize";

export default class Company extends Model {}

export const companyInitter = (sequelize) => {
    Company.init({});

    return () => {};
};