const { default: axios } = require("axios");
const { auth } = require("../moddleware/auth");
const { recipie } = require("../model/recipieModel");
require("dotenv").config();

const recipieRout = require("express").Router();

recipieRout.get("/:offset", async (req, res) => {
  let offset = req.params.offset;

  axios
    .get(`https://api.spoonacular.com/recipes/complexSearch?offset=${ offset ? offset : 0 }&apiKey=6f105b7e59dd4ade90b5dc2630bf09b6`)
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(404).send({ msg: "data not found" });
    });
});
// kjhvjh

recipieRout.get("/search/:query",auth,async(req,res)=>{
  let query=req.params.query
  axios
  .get(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=6f105b7e59dd4ade90b5dc2630bf09b6`)
  .then((response) => {
    res.status(200).send(response.data);
  })
  .catch((err) => {
    console.log(err.message);
    res.status(404).send({ msg: "data not found" });
  });

})

recipieRout.post("/",auth, async (req, res) => {
    let {id,image,imageType,title,userID}=req.body
    let data = await recipie.findOne({ where: { recipi_id:id } });
  
    if (data) {
      return res
        .status(200)
        .send({ msg: "recipie already saved" });
    }
    // console.log(hash);
    let recip = recipie.build({
      recipi_id:id,
      image,
      imageType,
      title,
      user_id:userID
    });
    await recip.save();
    return res.status(201).send("recipie saved successfully");
    
})


recipieRout.get("/steps/:id",auth, async (req, res) => {
let recid=req.params.id

  axios
  .get(`https://api.spoonacular.com/recipes/${recid}/analyzedInstructions?apiKey=6f105b7e59dd4ade90b5dc2630bf09b6`)
  .then((response) => {
    res.status(200).send(response.data);
  })
  .catch((err) => {
    console.log(err.message);
    res.status(404).send({ msg: "data not found" });
  });

})
recipieRout.patch("/my",auth,async (req,res)=>{
  let {userID}=req.body
  console.log(userID)
  let data=await recipie.findAll({ where: { user_id:userID } })
  console.log(data)
  res.send({data})
})


recipieRout.delete("/my/:id",auth,async (req,res)=>{
  let id=req.params.id
  let {userID}=req.body
  console.log(userID)
  let data=await recipie.destroy({ where: { user_id:userID,id } })
  console.log(data)
  res.send({msg:"data is deleted"})
})

// recipieRout.delete("/",async (req,res)=>{
//      await recipie.drop()
//      res.send("table is dropped")
// })

module.exports = { recipieRout };
