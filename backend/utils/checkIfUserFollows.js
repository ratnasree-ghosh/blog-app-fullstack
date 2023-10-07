const { TRUE, ERROR, FALSE } = require("../constants");
const { getFollowData } = require("../repository/follow.repository");


const checkIfUserFollows = async(followingUserId, followerUserId)=>{
    const followData = await getFollowData(followingUserId,followerUserId);

    // Different states of responses--
    if(followData.data !== null){
        return TRUE;
    }else if(followData.err){
        return ERROR;
    }else{
        return FALSE;
    }
}

module.exports = {checkIfUserFollows};