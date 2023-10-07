
import { useEffect, useState } from 'react';
import Header from '../components/common/Header';
import axios from 'axios';
import UserCard from '../components/Users/UserCard';

function Users() {

    const [users, setUsers] = useState();
    const [count, setCount] = useState(0);
    const token = localStorage.getItem("token");

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/get-all-users`, {
            headers: {
                "x-acciojob": token,
              },
        }).then(res1=>{
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
             setUsers(allUsersDetails);
             setCount(allUsersDetails.length);
        }).catch(err=>{
            alert(err);
        })
        }).catch(err=>{
            alert(err);
        })
    }, [token]);
  return (
    <div>
    <Header/>
   <h1 style={{textAlign: "center", margin: "20px"}}>Users</h1>
   <h5 style={{textAlign: "center", margin: "20px", fontWeight: "normal"}}> Total Users: {count}</h5>
   <div style={{display: "flex", justifyContent: "space-evenly", alignItems: "center", flexWrap: "wrap"}}>
   {users?.map((user)=>(
    <UserCard props={user}/>
   ))}
   </div>

    </div>
  );
}

export default Users;