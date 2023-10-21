import Blog from "../models/blogs.js"

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
        const blog = await Blog.create({title,description,image,user});

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
        const blog = await Blog.findByIdAndRemove(id);

        if(!blog)
            return res.status(404).json({message:"No blog found"});

        return res.status(200).json({message: "Successfully deleted"})
    } catch (error) {
        console.log(error);
    }
}