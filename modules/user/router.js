import { Router } from "express";
import { validate } from "../middleware/validator.js";
import { regDto } from "./dto/registration-dto.js";
import { authDto } from "./dto/authorization-dto.js";
import { editDto } from "./dto/profile-edit-dto.js";
import { TokenGuard } from "../middleware/token-guard.js";
import UserController from "./controller.js";

const router = new Router();

router.post("/registration", validate(regDto), UserController.registration);
router.post("/authorization", validate(authDto), UserController.authorization);
router.put("/edit", validate(editDto), TokenGuard.verify, UserController.edit);
router.delete("/delete", TokenGuard.verify, UserController.delete);

export default router;
