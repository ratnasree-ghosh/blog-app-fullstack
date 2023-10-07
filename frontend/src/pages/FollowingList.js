import React, { useEffect, useState } from "react";
import Header from "../components/common/Header";
import UserCard from "../components/Users/UserCard";
import axios from "axios";

const FollowingList = ()=>{
    const [followings, setFollowings] = useState();
    const [count, setCount] = useState(0);
    const token = localStorage.getItem("token");

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/follow/following-list`, {
            headers: {
                "x-acciojob": token,
              },
        }).then(res=>{
            let followingListArr = [];
            res.data.data.forEach((user)=>{
              const userObj = {
                _id: user._id,
                username: user.username,
                email: user.email,
                follow: true
              }

              followingListArr.push(userObj);
            });

            
            setFollowings(followingListArr);
            setCount(followingListArr.length);
            
        }).catch(err=>{
            alert(err);
        })
    }, [token]);
  return (
    <div>
    <Header/>
   <h1 style={{textAlign: "center", margin: "20px"}}>Followings</h1>
   <h5 style={{textAlign: "center", margin: "20px", fontWeight: "normal"}}> Total Followings: {count}</h5>
   <div style={{display: "flex", justifyContent: "space-evenly", alignItems: "center", flexWrap: "wrap"}}>
   {followings?.map((following)=>(
    <UserCard props={following}/>
   ))}
   </div>

    </div>
  );
}

export default FollowingList;