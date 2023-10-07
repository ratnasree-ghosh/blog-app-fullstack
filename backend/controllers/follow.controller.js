const Joi = require("joi");
const { verifyUserId } = require("../utils/verifyUserId");
const { addFollowToDB, deleteFollowFromDB, getFollowingListFromDB, getFollowerListFromDB, getFollowerDetailsFromDB, getFollowingDetailsFromDB } = require("../repository/follow.repository");
const { TRUE, ERROR, FALSE } = require("../constants");
const { checkIfUserFollows } = require("../utils/checkIfUserFollows");
const FollowSchema = require("../models/FollowSchema");


const followUser = async(req,res)=>{
    const followerUserId = req.locals.userId;
    const {followingUserId} = req.body;
    // validate the body--

    const isValid = Joi.object({
        followingUserId: Joi.string().required(),
    }).validate(req.body);

    if(isValid.error){
        return res.status(400).send({
            status: 400,
            message: "Invalid user Id",
            data: isValid.error,
        });
    }

    // validate follwingUserId---
    const isUser1 = await verifyUserId(followingUserId);

    if(isUser1=== ERROR){
        return res.status(400).send({
            status: 400,
            message: "DB error: from verifyUserId function"
        })
    }else if(isUser1=== FALSE){
        return res.status(400).send({
            status: 400,
            message: "Follwing User doesn't exists",
        })
    }

    // validate follwerUserId---

    const isUser = await verifyUserId(followerUserId);

    if(isUser=== ERROR){
        return res.status(400).send({
            status: 400,
            message: "DB error: from verifyUserId function"
        })
    }else if(isUser=== FALSE){
        return res.status(400).send({
            status: 400,
            message: "Follower User doesn't exists",
        })
    }

    // check if the followerUserId already follows the follwingUserId---
    const alreadyFollows = await checkIfUserFollows(followingUserId, followerUserId);
    if(alreadyFollows===TRUE){
        return res.status(400).send({
            status: 400,
            message: "You already followed this user!",

        })
    }else if(alreadyFollows===ERROR){
        return res.status(400).send({
            status: 400,
            message: "DB error: from checkIfUserFollows function"
        })
    }

    const followObj = new FollowSchema({
        followingUserId,
        followerUserId,
        creationDateTime: Date.now(),
    });

    const response = await addFollowToDB(followObj);

    if(response=== ERROR){
        return res.status(400).send({
            status: 400,
            message: "DB error: from addFollowToDB function"
        })
    }

    res.status(200).send({
        status: 200,
        message: "Followed user Successfully!"
    })
    
     
};

const unfollowUser = async(req,res)=>{
    const followerUserId = req.locals.userId;
    const {followingUserId} = req.body;
    // validate the body--

    const isValid = Joi.object({
        followingUserId: Joi.string().required(),
    }).validate(req.body);

    if(isValid.error){
        return res.status(400).send({
            status: 400,
            message: "Invalid user Id",
            data: isValid.error,
        });
    }

    // validate followingUserId---
    const isUser1 = await verifyUserId(followingUserId);

    if(isUser1=== ERROR){
        return res.status(400).send({
            status: 400,
            message: "DB error: from verifyUserId function"
        })
    }else if(isUser1=== FALSE){
        return res.status(400).send({
            status: 400,
            message: "Follwing User doesn't exists",
        })
    }

    // validate followerUserId---

    const isUser = await verifyUserId(followerUserId);

    if(isUser=== ERROR){
        return res.status(400).send({
            status: 400,
            message: "DB error: from verifyUserId function"
        })
    }else if(isUser=== FALSE){
        return res.status(400).send({
            status: 400,
            message: "Follower User doesn't exists",
        })
    }

    // check if the followerUserId already follows the follwingUserId---
    const alreadyFollows = await checkIfUserFollows(followingUserId, followerUserId);
    if(alreadyFollows===FALSE){
        return res.status(400).send({
            status: 400,
            message: "You don't follow this user",

        })
    }else if(alreadyFollows===ERROR){
        return res.status(400).send({
            status: 400,
            message: "DB error: from checkIfUserFollows function"
        })
    }

   
    const response = await deleteFollowFromDB(followingUserId, followerUserId);

    if(response=== ERROR){
        return res.status(400).send({
            status: 400,
            message: "DB error: from deleteFollowToDB function"
        })
    }

    res.status(200).send({
        status: 200,
        message: "Unfollowed user Successfully!"
    })
}

const getFollowingList = async(req,res)=>{
    const userId = req.locals.userId;

    const isUser = await verifyUserId(userId);

    if(isUser=== ERROR){
        return res.status(400).send({
            status: 400,
            message: "DB error: from verifyUserId function"
        })
    }else if(isUser=== FALSE){
        return res.status(400).send({
            status: 400,
            message: "You are not exists",
        })
    }


    const followingList = await getFollowingListFromDB(userId);

    if(followingList.err){
        return res.status(400).send({
            status: 400,
            message: "DB error: getFollowingListFromDB function"
        })
    }

    let followingUserId = [];

    followingList.data.forEach((followObj)=>{
        followingUserId.push(followObj.followingUserId);
    });
    

    const followingDetails = await getFollowingDetailsFromDB(followingUserId);

    if(followingDetails.err){
        return res.status(400).send({
            status: 400,
            message: "DB error: from getFollowingDetailsFromDB function"
        })
    }

    
    let userData = [];
    followingDetails.data.map((user)=>{
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
        message: "Fetched following lists!",
        data: userData,
    })
}

const getFollowerList = async(req,res)=>{
    const userId = req.locals.userId;

    const isUser = await verifyUserId(userId);

    if(isUser=== ERROR){
        return res.status(400).send({
            status: 400,
            message: "DB error: from verifyUserId function"
        })
    }else if(isUser=== FALSE){
        return res.status(400).send({
            status: 400,
            message: "You are not exists",
        })
    }


    const followerList = await getFollowerListFromDB(userId);

    if(followerList.err){
        return res.status(400).send({
            status: 400,
            message: "DB error: getFollowerListFromDB function"
        })
    }

    let followerUserId = [];

    followerList.data.forEach((followObj)=>{
        followerUserId.push(followObj.followerUserId);
    });

    const followerDetails = await getFollowerDetailsFromDB(followerUserId);

    if(followerDetails.err){
        return res.status(400).send({
            status: 400,
            message: "DB error: from getFollowerDetailsFromDB function"
        })
    }

    let usersData = [];
    followerDetails.data.map((user)=>{
        let data = {

            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
        }

        usersData.push(data);
    });

    return res.status(200).send({
        status: 200,
        message: "Fetched follower lists!",
        data: usersData,
    })
}

module.exports = { followUser,unfollowUser,getFollowingList, getFollowerList };