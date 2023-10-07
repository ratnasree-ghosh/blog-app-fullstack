import Button from "react-bootstrap/Button";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
// import { useLocation } from "react-router-dom";
import axios from "axios";
import Header from "../components/common/Header";

const Login = () => {

    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState();

    // const location = useLocation();
    // const data = location.state;

    useEffect(()=>{
        if(localStorage.getItem("token")){
            window.location.href = "/";
        }
    },[]);

    const loginObj = {
        loginId,
        password
    }

    function handleLogin(e){
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/login`, loginObj).then(res=>{
            if(res.data.status===200){
                localStorage.setItem("token", res.data.data.token);

                if(localStorage.getItem("name")===null){
                  localStorage.setItem("name", loginObj.loginId);
                }
                // 
                window.location.href = "/";
                
                
            }else{
                alert(res.data.message);
            }
        }).catch(err=>{
            alert(err);
        })
    }

  return (
    
    <>
    <Header/>
    
    <div style={{padding: "3rem"}}>
      
      <Form onSubmit={handleLogin}>
        <h1
          style={{
            marginBottom: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Login
        </h1>
        <Form.Group className="mb-3" controlId="loginId">
          <Form.Label>Username or Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username or email"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="*******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" style={{marginTop: "15px"}} variant="info">Login</Button>{' '}
      </Form>
    </div>
    </>
  );
};

export default Login;
