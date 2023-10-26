import  Express  from "express";
import { addBlog, deleteBlog, getAllBlogs, getById, getByUserId, updateBlog } from "../controllers/blogController.js";

const router = Express.Router();

router.get("/",getAllBlogs);
router.post("/add", addBlog);
router.put("/update/:id", updateBlog);
router.get("/:id",getById);
router.delete("/:id", deleteBlog);
router.get("/user/:id", getByUserId)
export default router;