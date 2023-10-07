const { TRUE, ERROR } = require("../constants");
const Follow = require("../models/FollowSchema");
const User = require("../models/UserSchema");


const getFollowData = async(followingUserId,followerUserId)=>{
    const followData = {
        data: null,
        err: null,
      };
      try {
        followData.data = await Follow.findOne({followingUserId, followerUserId });
        return followData;
      } catch (err) {
        followData.err = err;
        return followData;
      }
}

const addFollowToDB = async(followObj)=>{
    try{
        await followObj.save();
        return  TRUE;
    }catch(err){
        return ERROR;
    }
}

const deleteFollowFromDB = async(followingUserId,followerUserId)=>{
    try{
        await Follow.findOneAndDelete({followingUserId,followerUserId});
        return  TRUE;
    }catch(err){
        return ERROR;
    }
}

const getFollowingListFromDB = async(followerUserId)=>{
    const followingList = {
      data: null,
      err: null,
    };
    try {
      followingList.data = await Follow.find({followerUserId});
      return followingList;
    } catch (err) {
        followingList.err = err;
      return followingList;
    }
  }

  const getFollowingDetailsFromDB = async(followingUserId)=>{
    const followingDetails = {
        data: null,
        err: null,
      };
      try {
        followingDetails.data = await User.find({_id: { $in: followingUserId}});
        
        return followingDetails;
      } catch (err) {
        followingDetails.err = err;
        return followingDetails;
      }
  }

  const getFollowerListFromDB = async(followingUserId)=>{
    const followerList = {
      data: null,
      err: null,
    };
    try {
        followerList.data = await Follow.find({followingUserId});
      return followerList;
    } catch (err) {
        followerList.err = err;
      return followerList;
    }
  }

  const getFollowerDetailsFromDB = async(followerUserId)=>{
    const followerDetails = {
        data: null,
        err: null,
      };
      try {
        followerDetails.data = await User.find({_id: {$in: followerUserId}});
        return followerDetails;
      } catch (err) {
        followerDetails.err = err;
        return followerDetails;
      }
  }

module.exports = {
    getFollowData,
    addFollowToDB,
    deleteFollowFromDB,
    getFollowingListFromDB,
    getFollowingDetailsFromDB,
    getFollowerListFromDB,
    getFollowerDetailsFromDB,
  };