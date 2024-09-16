import { Op } from "sequelize";
import Game from "../models/game.js";

export default class GameService {
    async addGame(doc) {
        if (await Game.count({ where: { name: { [Op.iLike]: doc.name } } })) {
            return { conflict: true, nameError: true };
        }
        return { conflict: false, game: await Game.create(doc) };
    }

    async editGame(id, data) {
        // TODO: add owner
        const gameFindStatus = await Game.findByPk(id);
        if (!gameFindStatus) return { conflict: true, gameNotFound: true };
        await gameFindStatus.update(data);
        return { conflict: false };
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
