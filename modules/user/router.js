import { Router } from "express";
import { validate } from "../middleware/validator.js";
import { regDto } from "./dto/registration-dto.js";
import { authDto } from "./dto/authorization-dto.js";
import { editDto } from "./dto/profile-edit-dto.js";
import { TokenGuard } from "../middleware/token-guard.js";
import controller from "./controller.js";
import { checkRole } from "../common/middleware/check-account-access.js";

const router = new Router();

router.post("/registration", validate(regDto), controller.registration);
router.post("/authorization", validate(authDto), controller.authorization);
router.patch("/edit", TokenGuard.verify, checkRole(), validate(editDto), controller.edit);
router.delete("/delete", TokenGuard.verify, checkRole(), controller.delete);

export default router;
