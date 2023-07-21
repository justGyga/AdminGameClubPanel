import { Router } from "express";
import { validate } from "../middleware/validator.js";
import { registerDto } from "./dto/registration-dto.js";
import { authorizationDto } from "./dto/authorization-dto.js";
import { TokenGuard } from "../middleware/token-guard.js";
import UserController from "./controller.js";

const router = new Router();

router.post("/registration", validate(registerDto), UserController.registration);
router.post("/authorization", validate(authorizationDto), UserController.login);
router.put("/profile/edit", TokenGuard.verify, UserController.edit);
router.delete("/profile/delete", TokenGuard.verify, UserController.delete);

export default router;
