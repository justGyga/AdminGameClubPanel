import { Router } from "express";
import { CONTEXT, Validator } from "../../core/validation.js";
import { uuidDto } from "../common/validators/uuid.js";
import AuthController from "./controller.js";
import { loginDto } from "./dto/login-dto.js";
import { registerDto } from "./dto/register-dto.js";

const router = Router();

router.post("/register", Validator.validate(registerDto), AuthController.registerUser);
router.post("/login", Validator.validate(loginDto), AuthController.login);
router.get("/activate/:id", Validator.validate(uuidDto, CONTEXT.PATH), AuthController.activate);

export default router;
