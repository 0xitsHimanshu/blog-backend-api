import Express from "express";
import userRouter from './routes/userRoutes.js';
import blogRouter from './routes/blogRoutes.js'

const app = Express();

app.use(Express.json());

//accessing routes 
app.use("/api/v1/user", userRouter);
app.use("/api/v1/blog", blogRouter)


//serving static env on path "/"
app.get("/", (req,res, next)=>{
    res.send('Hello everyone');
});

export default app;