import { Router } from "express";
import { validate } from "../middleware/validator.js";
import { regDto } from "./dto/registration-dto.js";
import { authDto } from "./dto/authorization-dto.js";
import { editDto } from "./dto/edit-dto.js";
import { TokenGuard } from "../middleware/token-guard.js";
import CompanyController from "./controller.js";

const router = new Router();

router.post("/registration", validate(regDto), CompanyController.registration);
router.post("/authorization", validate(authDto), CompanyController.authorization);
router.put("/edit", validate(editDto), TokenGuard.verify, CompanyController.edit);
router.delete("/delete", TokenGuard.verify, CompanyController.delete);
router.get("/session", validate(regDto), (req, res) => {
    res.status(200).end();
});

export default router;
