const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config/.env" });
const {
  validator,
  loginRules,
  registerRules,
} = require("../middlewares/bodyValidator");
const isAuth = require("../middlewares/isAuth")
const User = require("../models/User");


//Register
//Register
router.post("/register", registerRules(), validator, async (req, res) => {
  const { firstName, lastName, email, password, role,code } = req.body;
  try {
    //find if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).send({ msg: "User Already exists" });
    }

    //create a new user
    user = new User({
      firstName,
      lastName,
      email,
      password,
      role
    });
   if ( user.role==="admin" && req.body.code !== process.env.secretOradmin){
    return res.status(400).send({ msg: "type your secret code if you are admin" })};
   

    //hash the password
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;

    //save the user
    await user.save();
    //sign the user

    const payload = {
      _id: user._id,
    };
    const token = await jwt.sign(payload, process.env.secretOrKey);

    res.status(200).send({ msg: "user saved",user,token});
  
  } catch (error) {
    res.status(500).send({ msg: "Server error" });
  }
});
//Login
router.post("/login", loginRules(), validator, async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ msg: "Bad Credentials email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send({ msg: "Bad Credentials password" });
    }

    //sign the user

    const payload = {
      _id: user._id,
    };

    const token = await jwt.sign(payload, process.env.secretOrKey);

    res.send({ msg: "Login Success", user, token });
  } catch (error) {
    res.status(500).send({ msg: "Server error" });
  }
});


router.get("/me", isAuth, (req, res) => {
  res.status(200).send({ user: req.user });
});


  
  module.exports = router;
  
 
