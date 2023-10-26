import mongoose from "mongoose";
import Blog from "../models/blogs.js"
import { User } from "../models/users.js";

export const getAllBlogs = async (req,res, next)=>{
    try {
        const blog = await Blog.find()
        if(!blog) return res.status(404).json({message: "No blog found"});

        return res.status(200).json({blog})
    } catch (error) {
        console.log(error)
    }
}

export const addBlog =async (req,res,next) =>{
    try {
        const {title,description,image, user} = req.body;
        
        const existingUser = await User.findById(user);
        if(!existingUser){
            return res.status(400).json({message: "Unable to find user by this Id"})
        }
        
        const session = await mongoose.startSession();
        session.startTransaction();
        
        const blog = new Blog({title,description,image,user})
        await blog.save({session})
        existingUser.blogs.push(blog);

        await existingUser.save({session});
        await session.commitTransaction();

        return res.status(200).json({blog});

    } catch (error) {
        console.log(error);
    }
} 

export const updateBlog = async (req,res,next) => {
    try {
        const {title, description} = req.body;
        const blogId = req.params.id;

        const blog = await Blog.findByIdAndUpdate(blogId,{
            title,
            description
        } )
        
        if(!blog){
            return res.status(500).json({message: "Unable to update the blog"});
        }

        return res.status(200).json({blog});

    } catch (error) {
        console.log(error)   
    }
}

export const getById = async (req, res, next) =>{
    try {
        const {id} = req.params;
        const blog = await Blog.findById(id);

        if(!blog) 
            return res.status(404).json({message: "Unable to find blog"});

        return res.status(200).json({blog});
    } catch (error) {
        console.log(error)
    }
}

export const deleteBlog = async (req, res, next) =>{
    try {
        const {id} = req.params;
        const blog = await Blog.findByIdAndRemove(id).populate('user');
        await blog.user.blogs.pull(blog);
        await blog.user.save();

        if(!blog)
            return res.status(404).json({message:"No blog found"});

        return res.status(200).json({message: "Successfully deleted"})
    } catch (error) {
        console.log(error);
    }
}

export const getByUserId = async (req, res, next) => {
    try {
        const userId = req.params.id;
    
        const userBlogs = await User.findById(userId).populate("blogs")
        if(!userBlogs)
                return res.status(404).json({message:"No blog found"});
        return res.status(200).json({blogs:userBlogs})
    } catch (error) {
        console.log(error);
        return res.status(404).json({message:error});
    }
}