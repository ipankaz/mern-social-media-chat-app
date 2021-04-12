const User = require("../models/users");
const jwt = require("jsonwebtoken");
const {validationResult}  = require('express-validator')
const bcrypt = require('bcrypt')

exports.signup =  (req, res) => {
 User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (user) {
      return res.status(400).json({
        message: "User Already registered",
      });
    }

    const { firstName, lastName, email, password, username,contactNumber } = req.body;
    const hash_password = await bcrypt.hash(password,10)
    const _user = new User({
      firstName,
      lastName,
      email,
      hash_password,
      username,
      contactNumber
    });
    _user.save((error, data) => {
      if (error) {
          console.log(error);
        return res.status(400).json({
          message: "User not signuped",
        });
      }
      if (data) {
        return res.status(201).json({
          message: "User created successfully",
        });
      }
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (error) {
      return res.status(400).json({ error });
    }
    if (user) {
      const { _id, firstName, lastName, email, role, fullName , username,contactNumber,profilePicture} = user;
      const passwordValidation = await user.authenticate(req.body.password);
      if (passwordValidation && user.role==="user") {
        const token = jwt.sign({ _id: user._id ,role:user.role}, process.env.SECRET_KEY, {
          expiresIn: "12h",
        });
        res.status(200).json({
          token,
          user: { _id, firstName, lastName, email, role, fullName ,username,contactNumber,profilePicture},
        });
      } else {
        return res.status(400).json({
          message: "Invalid Password",
        });
      }
    }else{
      return res.status(400).json({message:"no user found"})
    }
  });
};

exports.signout = (req,res,next)=>{
  res.clearCookie('token')
  res.status(200).send({message:"Signout Successfully"})
}

exports.requireSignin =(req,res,next)=>{
  const token = req.headers.authorization.split(" ")[1]
  const user = jwt.verify(token,process.env.SECRET_KEY)
  req.user = user
  
  next()
}
