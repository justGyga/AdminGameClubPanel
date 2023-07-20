import Router from "express";
import UserController from "./controller.js";

const router = new Router();

router.post("/registration", UserController.registration);
router.post("/authorization", UserController.login);
router.post("/profile/edit");
router.post("/profile/delete");

export default router;
