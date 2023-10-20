import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title : {
        type:String,
        required: true,
    },
    description : {
        type: String,
        unique: true,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    user : {
        type: String,
        required : true,
    },
})
let Blog;
export default Blog = mongoose.model("Blog",schema);
