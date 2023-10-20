import  Express  from "express";
import { addBlog, getAllBlogs, updateBlog } from "../controllers/blogController.js";

const router = Express.Router();

router.get("/",getAllBlogs);
router.post("/add", addBlog);
router.put("/update/:id", updateBlog)

export default router;