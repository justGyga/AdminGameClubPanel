import { Router } from "express";
import { validate } from "../middleware/validator.js";
import { regDto } from "./dto/registration-dto.js";
import { authDto } from "./dto/authorization-dto.js";
import { editDto } from "./dto/edit-dto.js";
import { TokenGuard } from "../middleware/token-guard.js";
import CompanyController from "./controller.js";
import { checkRole } from "../common/middleware/check-account-access.js";
import { ACCOUNT_TYPE } from "../common/vars/enums.js";

const router = new Router();

router.post("/registration", validate(regDto), CompanyController.registration);
router.post("/authorization", validate(authDto), CompanyController.authorization);
router.patch("", TokenGuard.verify, checkRole(ACCOUNT_TYPE.COMPANY), validate(editDto), CompanyController.edit);
router.delete("", TokenGuard.verify, checkRole(ACCOUNT_TYPE.COMPANY), CompanyController.delete);
router.get("/session", validate(regDto), (req, res) => {
    res.status(200).end();
});

export default router;
