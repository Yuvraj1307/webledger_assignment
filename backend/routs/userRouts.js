const jwt=require("jsonwebtoken");
const { User } = require("../model/userMdel");
const bcrypt=require("bcrypt");
const { auth } = require("../moddleware/auth");
require("dotenv").config()

const userRouter=require("express").Router()

// <<<<<<<<<<-----------to get all users------------>>>>>>>>>>>>>>>
userRouter.get("/",auth, async(req,res)=>{
    try {
        let users=await User.findAll()
        console.log(users)
        res.send(users)
        
    } catch (error) {
        res.send({error})
    }
})

//<<<<<<<<<<<<<-----------to register user------------>>>>>>>>>>>>>
userRouter.post("/register",async(req,res)=>{
    const { name, email, password } = req.body  ;
    console.log(name, email, password )
    try {
      let data = await User.findOne({ where: { email } });
  
      if (data) {
        return res
          .status(200)
          .send({ msg: "user already registered please login" });
      }
  
      bcrypt.hash(password, 5, async function (err, hash) {
        if (err) {
          console.log(err.message);
          return res.status(404).send({ msg: "something went wrong", err });
        } else {
          console.log(hash);
          let user = User.build({
            name,
            email,
            password: hash,
          });
          await user.save();
          return res.status(201).send("user registered successfully");
        }
      });
        
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ msg: error.message });
    }
})


//<<<<<<<<<<<<<<<<-------------to login user------------->>>>>>>>>>>>>>>>>
userRouter.post("/login", async (req, res) => {
     
  
    let { email, password } = req.body;
  
    try {
      let user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).send({ msg: "user not found" });
      }
  
      // remember to check for id
    bcrypt.compare(password, user.dataValues.password, function (err, result) {
        if (result) {
          var token = jwt.sign(
            {userID:user.dataValues.id, email: user.dataValues.email },
            process.env.SECRET_KEY,
            { expiresIn: "2h" }
          );
          console.log(token);
          res
            .status(201)
            .send({ msg: "login success", token, name: user.dataValues.name, userID:user.dataValues.id });
        } else {
          console.log(err);
          res.status(404).send({ mag: "Incorrect pasword" });
        }
      });
     } catch (error) {
      console.log(error.message);
      res.status(400).json({ msg: error.message });
    }
  });



  module.exports={userRouter}