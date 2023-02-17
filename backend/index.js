const express=require("express")
const {connection} =require("./confige/db")
const app=express()
require("dotenv").config()
app.use(express.json())
let cors=require("cors")
const { userRouter } = require("./routes/user.route")

const { authentication } = require("./middleware/authentication")
const { mapsRoute } = require("./routes/dashboard.route")

app.use(cors({
    origin:"*"
}))

let PORT=process.env.PORT||8080

app.get("/",(req,res)=>{
    res.send("welcome to home")
})


app.use("/user",userRouter)
app.use(authentication)
app.use("/dashboard",mapsRoute)


app.listen(PORT,async(req,res)=>{
    
    try {
        await connection
        console.log(`listening on port ${PORT}`)
    } catch (error) {
        console.log("err while connecting")
    }
})