import autoBind from "auto-bind";
import GameService from "./service.js";

class GameController {
    #gameService;

    constructor() {
        autoBind(this);
        this.#gameService = new GameService();
    }

    async add(req, res) {
        try {
            const { conflict, nameError, game } = await this.#gameService.addGame(req.body);
            if (conflict && nameError) return res.status(409).json({ message: `Game ${req.body.name} already exist` });
            res.status(201).json(game);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Ops! Something went wrong!" });
        }
    }

    async edit(req, res) {
        try {
            const { conflict, gameNotFound } = await this.#gameService.editGame(req.params.id, req.body);
            if (conflict && gameNotFound) {
                return res.status(404).json({ message: "Game not found" });
            }
            res.status(200).json({ message: "Game description was changed successfully" });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Ops! Something went wrong!" });
        }
    }

    async getAll(req, res) {
        res.status(200).json(await this.#gameService.getAllGames());
    }

    async getOne(req, res) {
        try {
            const result = await this.#gameService.getOneGame(req.params.id);
            if (!result) {
                return res.status(404).json({ message: "Game not exist" });
            }
            res.status(200).json(result);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Ops! Something went wrong!" });
        }
    }

    async delete(req, res) {
        await this.#gameService.deleteById(req.params.id);
        res.status(204).json();
    }
}

export default new GameController();
