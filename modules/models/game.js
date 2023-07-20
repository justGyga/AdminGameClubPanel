import { DataTypes, Model } from "sequelize";

export default class Game extends Model {}

export const gameInitter = (sequelize) => {
    Game.init({});

    return () => {};
};