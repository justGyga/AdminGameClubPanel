import { Router } from "express";
import { validate } from "../middleware/validator.js";
import { regDto } from "./dto/registration-dto.js";
import { authDto } from "./dto/authorization-dto.js";
import { editDto } from "./dto/edit-dto.js";

const router = new Router();

router.post("/registration", validate(regDto), (req, res) => {
    res.status(200).end();
});
router.post("/authorization", validate(authDto), (req, res) => {
    res.status(200).end();
});
router.put("/edit", validate(editDto), (req, res) => {
    res.status(200).end();
});
router.get("/session", validate(regDto), (req, res) => {
    res.status(200).end();
});
router.delete("/delete", (req, res) => {
    res.status(200).end();
});

export default router;
