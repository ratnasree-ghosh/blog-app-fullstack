import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Header from "../components/common/Header";

const CreateBlog = () => {

    const [title, setTitle] = useState('');
    const [textBody, setTextBody] = useState('');
    const token = localStorage.getItem("token");

    function handleCreateBlog(e){
        e.preventDefault();
        const blogObj = {
            title,
            textBody
        }
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/blog/create-blog`, blogObj, { 
            headers: {'x-acciojob': token}
        }).then(res=>{
            if(res.data.status===201){
                window.location.href = '/my-blogs';
            }else{
                alert(res.data.message);
            }
        }).catch(err=>{
            alert('Err from catch' + err);
        })

    }
  return (
    <>
        <Header/>
      <div style={{ padding: "3rem" }}>
      <Form onSubmit={handleCreateBlog}>
        <h1
          style={{
            marginBottom: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Create a blog
        </h1>
         <Form.Group className="mb-3" controlId="title">
          <Form.Label>Blog Title</Form.Label>
          <Form.Control type="text" placeholder="Title" value={title} onChange={e=> setTitle(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="textBody">
          <Form.Label>Blog Description</Form.Label>
          <Form.Control as="textarea" placeholder="Description" rows={3} value={textBody} onChange={e=> setTextBody(e.target.value)}/>
        </Form.Group>
        <Button type="submit" style={{ marginTop: "15px" }} variant="info">
          Create Blog
        </Button>{" "} 
        
      </Form>
    </div>
    </>
  );
};

export default CreateBlog;