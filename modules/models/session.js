import { DataTypes, Model } from "sequelize";

export default class Session extends Model {}

export const sessionInitter = (sequelize) => {
    Session.init({});

    return () => {};
};
