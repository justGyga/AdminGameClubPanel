import Game from "../models/game.js";
import { Op, where } from "sequelize";
import _ from "lodash";

export default class GameService {
    async addGame(doc) {
        if (await Game.count({ where: { name: { [Op.iLike]: doc.name } } })) {
            return [false, false];
        }
        if (doc.minNumUsers > doc.maxNumUsers) return [true, false];
        await Game.create(doc);
        return _.pick(doc, "name", "description");
    }

    async editGame(id, data) {
        const gameFindStatus = await Game.findByPk(id);
        if (!gameFindStatus) return [false, false];
        try {
            await gameFindStatus.update(data);
            return [true, true];
        } catch (error) {
            return [true, false];
        }
    }

    async getAllGames() {
        return await Game.findAll();
    }

    async getOneGame(id) {
        const gameFindStatus = await Game.findByPk(id);
        if (!gameFindStatus) return false;
        return gameFindStatus;
    }

    async deleteById(id) {
        Game.destroy({ where: { id } });
    }
}
