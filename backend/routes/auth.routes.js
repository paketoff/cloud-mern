const Router = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const {check, validationResult} = require("express-validator");
const router = new Router();

router.post('/registration', 
  [
    check('email', "Incorrect email!").isEmail(),
    check('password', "Password must be longer than 3 symbols and shorter than 15!").isLength({min: 3, max: 15}),
  ], async (req, res) => {

  try {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({message: "Invalid result!", errors});
    } 

    const {email, password} = req.body;

    const candidate = await User.findOne({email});

    if(candidate) {
      return res.status(400).json({message: `User with email ${email} already exist!`})
    } 
    const hashedPassword = await bcrypt.hash(password, 15);
    const user = new User({email, password: hashedPassword});
    
    await user.save();

    return res.json({message: "User was created!"});

  } catch (error) {
    console.log(error);
    res.send({message: "Server error!"});
  }
});

module.exports = router;