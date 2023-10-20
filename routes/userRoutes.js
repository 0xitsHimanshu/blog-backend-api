import  Express  from "express";
import { getalluser, login, signUpUser } from "../controllers/userController.js";

const router = Express.Router();

router.get("/all", getalluser);
router.post("/signup", signUpUser);
router.post("/login", login);

export default router;