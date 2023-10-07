const express = require("express");
const {createBlog, getUserBlogs, deleteBlog, editBlog, getHomepageBlogs} = require("../controllers/blog.controllers");
const { isAuth } = require("../middlewares/AuthMiddleware");
const app = express();


app.post("/create-blog", isAuth, createBlog);
app.get("/get-user-blogs", isAuth, getUserBlogs);
app.put("/edit-blog", isAuth, editBlog);
app.delete("/delete-blog/:blogId", isAuth, deleteBlog);
app.get("/homepage-blogs", isAuth, getHomepageBlogs);

module.exports = app;