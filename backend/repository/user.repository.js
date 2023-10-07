const { TRUE, ERROR } = require("../constants");
const User = require("../models/UserSchema");


const findUserWithEmailOrUsernameDB = async (email, username) => {
  let userData = {
    data: null,
    err: null,
  };
  try {
    // Db call to find if any records exists with the given email & password--
    userData.data = await User.find({ $or: [{ email }, { username }] });
    return userData;
  } catch (err) {
    userData.err = err;
    return userData;
  }
};

const getUserDataFromId = async (userId)=>{
  let userData = {
    data: null,
    err: null,
  };
  try {
    // Db call to find if any records exists with the given email & password--
    userData.data = await User.findById(userId);
    return userData;
  } catch (err) {
    userData.err = err;
    return userData;
  }
}

const addUserToDb = async (userObj) => {
  try {
    await userObj.save();
    return TRUE;
  } catch (err) {
    return ERROR;
  }
};

const getUserDataFromUsername = async (username) => {
  const userData = {
    data: null,
    err: null,
  };
  try {
    userData.data = await User.findOne({ username });
    return userData;
  } catch (err) {
    userData.err = err;
    return userData;
  }
};

const getUserDataFromEmail = async (email) => {
  const userData = {
    data: null,
    err: null,
  };
  try {
    userData.data = await User.findOne({ email });
    return userData;
  } catch (err) {
    userData.err = err;
    return userData;
  }
};

const getAllUsersFromDB = async(userId)=>{
  const allUsersData = {
    data: null,
    err: null,
  }

  // $ne is actually meand !==
  try{
    allUsersData.data = await User.find({_id: {$ne: userId}});
    return allUsersData;
     
  }catch(err){
    allUsersData.err = err;
    return allUsersData;
  }
}

module.exports = {
  findUserWithEmailOrUsernameDB,
  addUserToDb,
  getUserDataFromUsername,
  getUserDataFromEmail,
  getUserDataFromId,
  getAllUsersFromDB,
};
