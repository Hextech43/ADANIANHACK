const express = require("express")
const route = express.Router()
const path = require("path")

const userModel = require("./model/userModel")

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


// User SignUp

route.post("/signUp", async (req,res)=>{

    try{
        const {userName, email, password,} = req.body
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const user = await userModel.create({
        userName,email, password:hash,
        
    })
 
    res.status(200).json({message:"Success", data:user})

    }
    catch(err){
        res.status(400).json(
            err.message
        )

    }
})

//  user SignIn
route.post("/login", async(req, res)=>{
    try{
       
        const user = await userModel.findOne({email:req.body.email})
        !user && res.status(400).json({message:"Please provide the rigt email"})

        const check = await bcrypt.compare(req.body.password, user.password)
        !check && res.status(400).json({message:"Please provide the correct Password"})

        const {password, ...all} = user._doc
        const token = jwt.sign({
            id:user._id,
            email:user.email
        },
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
   
        
        )
        res.status(200).json({
   message:"You are Welcome", data:{...all, token}
           })

  
    }
   
catch(err){
        res.status(400).json({msg:"error signing in",data:err.message})
      }

})

// get All User

route.get("/signUp", async (req, res) => {
    const user = await userModel.find();
    try {
      res.status(200).json({
        mgs: "All Users gotten",
        data: user,
      });
    } catch (error) {
      res.status(400).json({
        mgs: "error",
        data: error,
      });
    }
  });




module.exports = route
