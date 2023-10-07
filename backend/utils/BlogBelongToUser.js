const { TRUE, ERROR, FALSE, NOT_EXISTS } = require("../constants");
const { getBlogDataFromDB } = require("../repository/blog.repository");

const BlogBelongToUser = async(blogId, userId)=>{
    const blogData = await getBlogDataFromDB(blogId);

    if(blogData.data===null && blogData.err === null){
        return NOT_EXISTS;

    }

    if(blogData.err){
        return ERROR;
    }else if(blogData.data.userId==userId){
        return TRUE;
    }else{
        return FALSE;
    }

    
}

module.exports = {BlogBelongToUser};