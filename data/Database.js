import mongoose from "mongoose";

const uri = "mongodb+srv://dbuser:FALLEN@cluster0.h7jcu0i.mongodb.net/BlogPost-Database?retryWrites=true&w=majority"

const ConnectDB = () => {
    mongoose.connect(uri)
    .then(()=> console.log("**** Database connected ****"))
    .catch((e)=> console.log(e))
}

export default ConnectDB;