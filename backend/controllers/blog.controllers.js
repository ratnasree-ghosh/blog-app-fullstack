const Blog = require("../models/BlogSchema");
const { TRUE, ERROR, FALSE, NOT_EXISTS } = require("../constants");
const Joi = require("joi");
const { addBlogToDb, getUserBlogsFromDB, delteBlogFromDB, updateBlogInDB, getBlogDataFromDB, getFollowingBlogsFromDB } = require("../repository/blog.repository");
const { BlogBelongToUser } = require("../utils/BlogBelongToUser");
const {getFollowingListFromDB} = require("../repository/follow.repository");

const createBlog = async(req,res)=>{
    const isValid = Joi.object({
        title: Joi.string().required(),
        textBody: Joi.string().min(30).max(1000).required(),

    }).validate(req.body);

    if(isValid.error){
        return res.status(400).send({
            status: 400,
            message: "Invalid data format",
            data: isValid.error,
        })
    }

    const {title, textBody} = req.body;

    const blogObj = new Blog({
        title,
        textBody,
        creationDateTime: Date.now(),
        userId: req.locals.userId,
        username: req.locals.username,
    });

    const response = await addBlogToDb(blogObj);

    if (response === ERROR) {
       return res.status(400).send({
          status: 400,
          message: "Err: blog not created addBlogToDb failed!",
        });
      }   
        res.status(201).send({
          status: 201,
          message: "blog created successfully!",
        });
      
};

const getUserBlogs = async(req,res)=>{
  const userId = req.locals.userId;
  const page = Number(req.query.page) || 1;
  const LIMIT = 10;

  const blogsData = await getUserBlogsFromDB(userId,page,LIMIT);        
  
  if(blogsData.err){
    return res.status(400).send({
      status: 400,
      message: "DB error: getUserBlogsFromDB failed!",
    });
  }

  res.status(200).send({
    status: 200,
    message: "Fetched user Blogs successfully",
    data: blogsData.data,
  })
}

const deleteBlog = async(req,res)=>{
  const blogId = req.params.blogId;
  const userId = req.locals.userId;
  const blogBelongToUserStatus = await BlogBelongToUser(blogId, userId);

  // console.log(blogBelongToUserStatus);

  if(blogBelongToUserStatus===ERROR){
    return res.status(400).send({
      status: 400,
      message: "DB error: getBlogDataFromDB failed!"
    })
  }else if(blogBelongToUserStatus===FALSE){
    return res.status(403).send({
      status: 403,
      message: "You're not allowed to delete the blog! as you are not the user!"
    })
  }else if(blogBelongToUserStatus===NOT_EXISTS){
    return res.status(400).send({
      status: 400,
      message: "Blog not Exists in DB!"
    })
  }

  const response = await delteBlogFromDB(blogId);
  if(response==ERROR){
     return res.status(400).send({
      status: 400,
      message: "DB error: delteBlogFromDB failed!"
    })
  }else{
    return res.status(200).send({
      status: 200,
      message: "Blog deleted successfully!",
    })
  }

}

const editBlog = async(req,res)=>{
  const {blogId,title,textBody} = req.body;
  const userId = req.locals.userId;

  const blogBelongToUserStatus = await BlogBelongToUser(blogId, userId);

  console.log(blogBelongToUserStatus);

  if(blogBelongToUserStatus===ERROR){
    return res.status(400).send({
      status: 400,
      message: "DB error: getBlogDataFromDB failed!"
    })
  }else if(blogBelongToUserStatus===FALSE){
    return res.status(403).send({
      status: 403,
      message: "You're not allowed to delete the blog! as you are not the user!"
    })
  }else if(blogBelongToUserStatus===NOT_EXISTS){
    return res.status(400).send({
      status: 400,
      message: "Blog not Exists in DB!"
    })
  }

  const blogData = await getBlogDataFromDB(blogId);

  if(blogData.err){
    return res.status(400).send({
      status: 400,
      message: "DB error: getBlogDataFromDB failed!",
      data: blogData.err,
    });
  }

  const creationDateTime = blogData.data.creationDateTime;
  const currentTime = Date.now();

  // it will give us no. of minitues of the blog creation---
  const diff = (currentTime-creationDateTime) / (1000*60);

  if(diff>30){
    return res.status(400).send({
      status: 400,
      message: "Not allowed to edit after 30 minutes of creation the blog!"
    });
  }

  const newBlogObj = {
    title, 
    textBody
  }

  const response = await updateBlogInDB(blogId,newBlogObj);
  if(response===ERROR){
    return res.status(400).send({
      status:400,
      message: "DB error: updateBlogInDB failed!"
    })
  }

  res.status(200).send({
    status:200,
    message: "Blog updated successfully!"
  });


};

const getHomepageBlogs = async(req,res)=>{
  const userId = req.locals.userId;

  const followingList = await getFollowingListFromDB(userId);

    if(followingList.err){
        return res.status(400).send({
            status: 400,
            message: "DB error: getFollowingListFromDB function"
        })
    }

    let followingUserIds = [];

    followingList.data.forEach((followObj)=>{
        followingUserIds.push(followObj.followingUserId);
    });

    const followingBlogs = await getFollowingBlogsFromDB(followingUserIds);

    if(followingBlogs.err){
      return res.status(400).send({
        status:400,
        message: "DB error: getFollowingBlogsFromDB failed!",
        data: followingBlogs.err,
      })
    }
  
    res.status(200).send({
      status:200,
      message: "Fetched all following blogs successfully!",
      data: followingBlogs.data,
    });
}

module.exports = {createBlog, getUserBlogs, deleteBlog, editBlog, getHomepageBlogs};