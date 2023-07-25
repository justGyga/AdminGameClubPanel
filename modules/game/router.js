import Router from "express";
import { validate, CONTEXT } from "../middleware/validator.js";
import { addDto } from "./dto/add-dto.js";
import { editDto } from "./dto/edit-dto.js";
import { idDto } from "./dto/id-dto.js";
import { TokenGuard } from "../middleware/token-guard.js";
import GameController from "./controller.js";

const router = new Router();

router.post("/add", validate(addDto), TokenGuard.verify, GameController.add);
router.patch("/:id", validate(idDto, CONTEXT.PATH), TokenGuard.verify, validate(editDto), GameController.edit);
router.get("/all", GameController.getAll);
router.get("/:id", validate(idDto, CONTEXT.PATH), GameController.getOne);
router.delete("/:id", validate(idDto, CONTEXT.PATH), TokenGuard.verify, GameController.delete);

export default router;
