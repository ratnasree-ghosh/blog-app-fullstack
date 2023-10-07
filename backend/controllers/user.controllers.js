const User = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { TRUE, ERROR } = require("../constants");
const { verifyUsernameAndEmaiExists } = require("../utils/verifyEmailUsername");
const {
  addUserToDb,
  getUserDataFromUsername,
  getUserDataFromEmail,
  getAllUsersFromDB,
} = require("../repository/user.repository");

//POST - Registering New User --
const registerUser = async (req, res) => {
  //Data validation --
  const isValid = Joi.object({
    name: Joi.string().required(),
    username: Joi.string().min(3).max(30).alphanum().required(),
    password: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
  }).validate(req.body);

  if (isValid.error) {
    return res.status(400).send({
      status: 400,
      message: "Invalid Input",
      data: isValid.error,
    });
  }

  const BCRYPT_SALTS = Number(process.env.BCRYPT_SALTS);
  // Checking whether we have any username or email already exists in database---
  const isUserExisting = await verifyUsernameAndEmaiExists(
    req.body.email,
    req.body.username
  );

  if (isUserExisting === TRUE) {
    return res.status(400).send({
      status: 400,
      message: "Email or Username already exists!",
    });
  } else if (isUserExisting === ERROR) {
    return res.status(400).send({
      status: 400,
      message: "Err: FROM FUNCTION verifyUsernameAndEmaiExists failed",
    });
  }

  const hashpassword = await bcrypt.hash(req.body.password, BCRYPT_SALTS);

  const userObj = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: hashpassword,
  });

  // add new user to database---
  const response = await addUserToDb(userObj);

  if (response === ERROR) {
    res.status(400).send({
      status: 400,
      message: "Err: user not added",
    });
  } else if (response === TRUE) {
    res.status(201).send({
      status: 201,
      message: "User registered successfully!",
    });
  }
};

const loginUser = async (req, res) => {
  //loginId can be email or username---
  const { loginId, password } = req.body;

  const isEmail = Joi.object({
    loginId: Joi.string().email().required(),
  }).validate({loginId});

  let userData;

  if (isEmail.error) {
    // const isUsernameValid = Joi.object({
    //     loginId: Joi.string().required(),
    // }).validate(loginId);

    // if(isUsernameValid.error){
    //    return res.status(400).send({
    //         status: 400,
    //         message: "Invalid input!",
    //         data: isUsernameValid.error
    //     })
    // }
    
    userData = await getUserDataFromUsername(loginId);
    if (userData.err) {
      return res.status(400).send({
        status: 400,
        message: "Database error: getUserDataFromUsername failed!",
        data: userData.err,
      });
    }
  } else {
    userData = await getUserDataFromEmail(loginId);
    if (userData.err) {
      return res.status(400).send({
        status: 400,
        message: "Database error: getUserDataFromEmail failed!",
        data: userData.err,
        
      });
    }
  }

  if (!userData.data) {
    return res.status(400).send({
      status: 400,
      message: "No user found! Please Register",
      data: userData.data
    });
  }

  const ispasswordMatching = await bcrypt.compare(password, userData.data.password);

  if(!ispasswordMatching){
    return res.status(400).send({
        status: 400,
        message: "Incorrect password!"
    });
  }

  // with the help of the token we can identify ifthe user s authenticated or not!--
  const payload={
   username: userData.data.username,
   name: userData.data.name,
   email: userData.data.email,
   userId: userData.data._id
  }
  const token = await jwt.sign(payload, process.env.JWT_SECRET);

  res.status(200).send({
    status: 200,
    message: "Login successfully!",
    data: {
        token: token
    },
  })

};

const getAllUsers = async(req,res)=>{
  const userId = req.locals.userId;

  const allUsersData = await getAllUsersFromDB(userId);

  if (allUsersData.err) {
    return res.status(400).send({
      status: 400,
      message: "Database error: getAllUsersFromDB failed!",
      data: userData.err,
      
    });
  }

  let userData = [];
  allUsersData.data.map((user)=>{
        let data = {

            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
        }

        userData.push(data);
    });

 return res.status(200).send({
    status: 200,
    message: "Fetched all users successfully",
    data: userData,
  })
}

module.exports = { registerUser, loginUser, getAllUsers };
