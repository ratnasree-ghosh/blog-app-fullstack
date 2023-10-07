import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import Header from "../components/common/Header";

const MyBlogs = () => {
  const [myBlogs, setMyBlogs] = useState();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/blog/get-user-blogs`, {
        headers: {
          "x-acciojob": token,
        },
      })
      .then((res) => {
        setMyBlogs(res.data.data);
        // console.log(res.data.data)
      })
      .catch((err) => {
        alert(err);
      });
  }, [token,myBlogs]);
  return (
    <>
      <Header/>
    
    <div style={{padding: "3rem"}}>
        <h1 style={{textAlign: "center", marginBottom: "40px"}}>My Blogs</h1>
        {myBlogs?.map((blog, key)=>(
            <BlogCard key={key} props={blog} homePage={false}/>
        ))}
        
    </div>
    </>
  )
};

export default MyBlogs;
