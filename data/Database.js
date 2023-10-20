import mongoose from "mongoose";

const uri = process.env.MONGO_URI;

const ConnectDB = () => {
    mongoose.connect(uri)
    .then(()=> console.log("**** Database connected ****"))
    .catch((e)=> console.log(e))
}

export default ConnectDB;