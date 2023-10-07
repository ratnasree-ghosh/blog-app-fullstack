const { TRUE, ERROR } = require("../constants");
const Blog = require("../models/BlogSchema");


const addBlogToDb = async (userObj) => {
    try {
      await userObj.save();
      return TRUE;
    } catch (err) {
      return ERROR;
    }
  };

  const getUserBlogsFromDB = async(userId,page,LIMIT)=>{
    let blogsData = {
      data: null,
      err: null
    }
    
    try{
       blogsData.data = await Blog.find({userId, isDeleted: {$ne: true}}).sort({creationDateTime: -1}).skip((page-1)*LIMIT).limit(LIMIT);
       return blogsData;
    }catch(err){
      blogsData.err = err;
      return blogsData;
    }
  }

  const  getBlogDataFromDB = async(blogId)=>{
    let blogData = {
      data: null,
      err: null
    }
    try{
      blogData.data = await Blog.findOne({_id: blogId, isDeleted: {$ne: true}});
      
      return blogData;
    }catch(err){
      blogData.err = err;
      
      return blogData;
    }
  }

  const delteBlogFromDB = async(blogId)=>{
    try{
        await Blog.findByIdAndUpdate(blogId, {isDeleted: true, deletionDateTime: Date.now()});
        return TRUE;
    }catch(err){
      return ERROR;
    }
  }

  const updateBlogInDB = async(blogId,newBlogObj)=>{
    try{
      await Blog.findByIdAndUpdate({_id: blogId}, newBlogObj);
      return TRUE;
    }catch(err){
      return ERROR;
    }
  }

  const getFollowingBlogsFromDB = async(followingUserIds)=>{
    let followingBlogsData = {
      data: null,
      err: null
    }
    try{
      
      followingBlogsData.data = await Blog.find({userId: { $in: followingUserIds}, isDeleted: {$ne: true}});

      return followingBlogsData;

    }catch(err){
      followingBlogsData.err = err;
      
      return followingBlogsData;
    }
  }

  module.exports = {addBlogToDb,getUserBlogsFromDB,getBlogDataFromDB,delteBlogFromDB,updateBlogInDB, getFollowingBlogsFromDB};