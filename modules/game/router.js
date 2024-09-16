import Router from "express";
import { validate, CONTEXT } from "../middleware/validator.js";
import { addDto } from "./dto/add-dto.js";
import { editDto } from "./dto/edit-dto.js";
import { idDto } from "./dto/id-dto.js";
import { TokenGuard } from "../middleware/token-guard.js";
import GameController from "./controller.js";
import { checkRole } from "../common/middleware/check-account-access.js";

const router = new Router();

router.post("/add", TokenGuard.verify, checkRole(), validate(addDto), GameController.add);
router.patch("/:id", TokenGuard.verify, checkRole(), validate(idDto, CONTEXT.PATH), validate(editDto), GameController.edit);
router.get("/all", GameController.getAll);
router.get("/:id", validate(idDto, CONTEXT.PATH), GameController.getOne);
router.delete("/:id", TokenGuard.verify, checkRole(), validate(idDto, CONTEXT.PATH), GameController.delete);

export default router;
