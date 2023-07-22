import { DataTypes, Model, STRING } from "sequelize";
import Session from "./session.js";

export default class Game extends Model {}

export const gameInitter = (sequelize) => {
    Game.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            gameName: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false
            },
            image: {
                type: DataTypes.STRING,
                defaultValue: "D:/_PS_PROJECTS/VDMH/VeryDeepMindHole.png",
                allowNull:true
            },
            minNumUsers: {
                type: DataTypes.INTEGER,
                defaultValue: 1,
                allowNull: true
            },
            maxNumUsers: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        { sequelize, tableName: "games" }
    );

    return () => {
        Game.hasMany(Session, { foreignKey: "gameId", onDelete: "CASCADE" });
    };
};
