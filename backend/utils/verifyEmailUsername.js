const {findUserWithEmailOrUsernameDB} = require("../repository/user.repository");
const {TRUE,FALSE,ERROR} = require("../constants");

const verifyUsernameAndEmaiExists = async(email,username)=>{
    const userData = await findUserWithEmailOrUsernameDB(email,username);

    // Different states of responses--
    if(userData.data.length !== 0){
        return TRUE;
    }else if(userData.err){
        return ERROR;
    }else{
        return FALSE;
    }
}

module.exports = {verifyUsernameAndEmaiExists};