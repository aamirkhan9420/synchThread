const express = require("express")
let { UserModel } = require("../model/user.model")
let jwt = require("jsonwebtoken")
let bcrypt = require("bcrypt")
const userRouter = express.Router()
userRouter.get("/", (req, res) => {
   res.send("welcome to user pannel")
})
userRouter.post("/signup", async (req, res) => {
   let {name, email, password } = req.body
   try {
      bcrypt.hash(password, 5, async (err, hashpasword) => {
         if (hashpasword) {
            let newuser = new UserModel({name: name, email: email, password: hashpasword })
            await newuser.save()
            res.send({ "msg": "new user added" })
         } else {
            res.send({ "msg": "failed to add new user" })
         }
      })


   } catch (error) {
      console.log(error)
      res.send({ "msg": error })
   }

})
userRouter.post("/login", async (req, res) => {
   let { email, password } = req.body
   let user = await UserModel.find({ email })

   try {
      if (user.length > 0) {
         let hashpassword = user[0].password
         let name=user[0].name
         let email=user[0].email
         bcrypt.compare(password, hashpassword, (err, result) => {
          
            if (result) {
               jwt.sign({ userId: user[0]._id }, process.env.KEY, (er, token) => {
                  if (token) {
                     res.send({ "msg": "login successful", "token": token,"name":name,"email":email })
                  } else {
                     res.send({ "msg": "login failed! please signup first", "err": er })
                  }
               })
            } else {
               res.send({ "msg": "login failed! please signup first", "err": err })
            }
         })
      }

   } catch (error) {
      res.send({ "msg": error })

   }


})

module.exports = { userRouter }