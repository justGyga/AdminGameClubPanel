import Router from "express";
import { addDto } from "./dto/add-dto.js";
import { editDescDto } from "./dto/edit-desc-dto.js";
import { editNameDto } from "./dto/edit-name-dto.js";
import { getByIdDto } from "./dto/get-by-id-dto.js";

const router = new Router();

router.post("/add", function (req, res) {
    res.status(200).json({ message: "Hello World" });
});
router.put("/edit/name", function (req, res) {
    res.status(200).json({ message: "Hello World" });
});
router.put("/edit/description", function (req, res) {
    res.status(200).json({ message: "Hello World" });
});
router.delete("/delete", function (req, res) {
    res.status(200).json({ message: "Hello World" });
});
router.get("/get/all", function (req, res) {
    res.status(200).json({ message: "Hello World" });
});
router.get("/get/:id", function (req, res) {
    res.status(200).json({ message: "Hello World" });
});

export default router;
