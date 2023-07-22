import Game from "../models/game.js";
import { Op } from "sequelize";
import _ from "lodash";

export default class GameService {
    async addGame(doc) {
        if (await Game.count({ where: { name: { [Op.iLike]: doc.name } } })) {
            return false;
        }
        const result = await Game.create(doc);
        return _.omit(result, "createdAt", "updatedAt");
    }

    async editName(id, newName) {
        const gameFindStatus = await Game.findByPk(id);
        if (!gameFindStatus) return false;
        gameFindStatus.name = newName;
        return await gameFindStatus.save();
    }

    async editDescription(id, newDescription) {
        const gameFindStatus = await Game.findByPk(id);
        if (!gameFindStatus) return false;
        gameFindStatus.description = newDescription;
        return await gameFindStatus.save();
    }

    async getAll() {
        return await Game.findAll();
    }

    async getOne(id) {
        const gameFindStatus = await Game.findByPk(id);
        if (!gameFindStatus) return false;
        return gameFindStatus;
    }

    async deleteById(id){
        Game.destroy({where: {id}})
    }
}
