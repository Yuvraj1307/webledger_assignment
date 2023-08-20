const jwt=require("jsonwebtoken");



const auth=(req,res,next)=>{
    let token = req.headers.authorization?.split(" ")[1];
    // let token=req.headers.authorization
    console.log(token)
  if (!token) {
    return res.status(404).send({ msg: "please login first" });
  }

  jwt.verify(token, "secret", function (err, decoded) {
    if (err) {
      return res.status(404).send({ msg: "please login again" });
    } else {
      if (typeof decoded === "string") {
         
        return res.status(500).send({ msg: "Unexpected token format" });
      }
      console.log(decoded);

      req.body.token = token;
      req.body.userID=decoded.userID  
      next();
    }
  });
}



module.exports={auth}