const express=require("express");
const { connection } = require("./db");
const { userRouter } = require("./Routes/User.routes");
const { postRouter } = require("./Routes/Post.routes");
const { auth } = require("./middleware/auth.middleware");
var cors = require('cors')

const app=express();
app.use(express.json())
app.use(cors())
app.use("/users",userRouter)

app.use(auth)
app.use("/posts",postRouter)

app.listen(8080,async()=>{
    try {
        await connection
        console.log("Connected to DB")
    } catch (error) {
        console.log(error)
    }
})