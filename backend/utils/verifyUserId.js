const { TRUE, ERROR, FALSE } = require("../constants");
const { getUserDataFromId } = require("../repository/user.repository");


const verifyUserId = async(userId)=>{
    const userData = await getUserDataFromId(userId);

    // Different states of responses--
    if(userData.data !== null){
        return TRUE;
    }else if(userData.err){
        return ERROR;
    }else{
        return FALSE;
    }
}

module.exports = {verifyUserId};