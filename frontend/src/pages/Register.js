import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import axios from "axios";

const Register = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    // const navigate = useNavigate();
    

    function handleRegister(e){
        e.preventDefault();

        const userObj = {
            name,
            username,
            email,
            password
        }

        // const data = { userName: name};
        
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/register`, userObj).then(res=>{
            if(res.data.status===201){
              localStorage.setItem("name", userObj.name);
              // navigate("/login", { state: data });
                window.location.href = "/login";
            }else{
                alert(res.data.message);
            }
        }).catch(err=>{
            alert(err);
        })
    }

    useEffect(()=>{
        if(localStorage.getItem("token")){
            window.location.href = "/";
        }
    },[]);
  return (
    <>
      <header/>
    
    <div style={{padding: "3rem"}}>
      <Form onSubmit={handleRegister}>
        <h1 style={{marginBottom: "20px", display: "flex", justifyContent: "center"}}>Register</h1>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="John Doe" value={name} onChange={e=>setName(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="username" >
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="John123" value={username} onChange={e=>setUsername(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="name@gamil.com" value={email} onChange={e=>setEmail(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Password</Form.Label>
          <Form.Control type="pasword" placeholder="******" value={password} onChange={e=>setPassword(e.target.value)}/>
        </Form.Group>
        <Button type="submit" style={{marginTop: "15px"}} variant="info">Register</Button>{' '}
      </Form>
    
  </div>
  </>
  );
};

export default Register;
