import app  from "./app.js";
import ConnectDB from "./data/Database.js";

const PORT = 4000;

//connecting to the database
ConnectDB();

//server listening
app.listen( PORT ,()=>{
    console.log("**** Server is working ****");
    console.log(`Server is working on the http://localhost:${PORT}`)
})
