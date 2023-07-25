import { DataTypes, Model } from "sequelize";
import Company from "./company.js";
import Game from "./game.js";

export default class Session extends Model {}

export const sessionInitter = (sequelize) => {
    Session.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            duration: {
                type: DataTypes.TIME,
                allowNull: false
            },
            date: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                allowNull: true
            },
            playersNumber: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
                allowNull: true
            }
        },
        { sequelize, tableName: "sessions" }
    );

    return () => {
        Session.belongsTo(Company, { foreignKey: "companyId", onDelete: "CASCADE" });
        Session.belongsTo(Game, { foreignKey: "gameId", onDelete: "CASCADE" });
    };
};
