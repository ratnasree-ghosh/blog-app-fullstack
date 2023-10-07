import React, { useEffect, useState } from "react";
import Header from "../components/common/Header";
import axios from "axios";
import BlogCard from "../components/BlogCard";

const Home = ()=>{
    const [homeBlogs, setHomeBlogs] = useState();
    const token = localStorage.getItem("token");

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/blog//homepage-blogs`, {
            headers: {
                "x-acciojob": token,
              },
        }).then(res=>{
            setHomeBlogs(res.data.data);
        }).catch(err=>{
            alert(err);
        })
    }, [token]);
    
    return (
        <div>
            
            <Header/>
            <div style={{padding: "30px"}}>
            {homeBlogs?.map((blog)=>(
                <BlogCard props={blog} homePage ={true} />
            ))}
            </div>
        </div>
    )
}

export default Home;