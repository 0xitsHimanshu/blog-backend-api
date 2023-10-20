import Express from "express";
import userRouter from './routes/userRoutes.js';
import blogRouter from './routes/blogRoutes.js'
import {config} from "dotenv";
const app = Express();

app.use(Express.json());

config({
    path:"./data/config.env",
});
//accessing routes 
app.use("/api/v1/user", userRouter);
app.use("/api/v1/blog", blogRouter)


//serving static env on path "/"
app.get("/", (req,res, next)=>{
    res.send('Hello everyone');
});

export default app;