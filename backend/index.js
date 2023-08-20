const express=require("express");
const {seq} =require("./config/db");
require("dotenv").config()
const  cors =require("cors");
const { userRouter } = require("./routs/userRouts");
const { recipieRout } = require("./routs/recipieRout");



const app = express();
app.use(cors({origin:"*"}))
app.use(express.json())
 


app.get("/",(req,res)=>{
    res.send("<h1>welcome to my world</h1>")
})

app.use("/user",userRouter)
app.use("/recipie",recipieRout)
seq.sync().then(()=>{
    app.listen(process.env.PORT,()=>{
                console.log(`connected at port ${process.env.PORT}`);
        
    })
})