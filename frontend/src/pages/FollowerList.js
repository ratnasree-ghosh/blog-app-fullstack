import React, { useEffect, useState } from "react";
import Header from "../components/common/Header";
import UserCard from "../components/Users/UserCard";
import axios from "axios";

const FollowerList = ()=>{
    const [followers, setFollowers] = useState();
    const token = localStorage.getItem("token");
    const [count, setCount] = useState(0);

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/follow/follower-list`, {
            headers: {
                "x-acciojob": token,
              },
        }).then(res1=>{
            // setFollowers(res.data.data);
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/follow/following-list`, {
                headers: {
                    "x-acciojob": token,
                  },
            }).then(res2=>{
                let followingMap = new Map();
                res2.data.data.forEach((user)=>{
                    followingMap.set(user.username, true);
                });

                let allUsersDetails = [];
                 res1.data.data.forEach((user)=>{
                    if(followingMap.get(user.username)){
                        let userObj = {
                            _id: user._id,
                            username: user.username,
                            email: user.email,
                            follow: true
                        };

                        allUsersDetails.push(userObj);
                    }else{
                        let userObj = {
                            _id: user._id,
                            username: user.username,
                            email: user.email,
                            follow: false
                        };

                        allUsersDetails.push(userObj);
                        
                    }
                 })
                 setFollowers(allUsersDetails);
                 setCount(allUsersDetails.length);
            }).catch(err=>{
                alert(err);
            })
        })
        .catch(err=>{
            alert(err);
        })
    }, [token]);
  return (
    <div>
    <Header/>
   <h1 style={{textAlign: "center", margin: "20px"}}>Followers</h1>
   <h5 style={{textAlign: "center", margin: "20px", fontWeight: "normal"}}> Total Followers: {count}</h5>
   <div style={{display: "flex", justifyContent: "space-around", alignItems: "center", flexWrap: "wrap"}}>
   {followers?.map((follower)=>(
    <UserCard props={follower}/>
   ))}
   </div>

    </div>
  );
}

export default FollowerList;