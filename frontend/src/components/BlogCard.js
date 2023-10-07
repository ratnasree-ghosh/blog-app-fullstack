import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import formatDateAndTime from "../DateTimeUtils";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useState } from "react";
// import MyBlogs from "../pages/MyBlogs";

function BlogCard({ props, homePage }) {
    const token = localStorage.getItem("token");
    const [isEdit, setIsEdit] = useState(false);
    const [title, setTitle] = useState('');
    const [textBody, setTextBody] = useState('');

    function handleDelete(e,blogId){
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/blog/delete-blog/${blogId}`,  { 
            headers: {'x-acciojob': token}
        }).then(res=>{
            if(res.data.status===200){
                alert(res.data.message);

                //to reload the whole page--
                // window.location.reload();

                //another way to delete blog & not reloading page! only rendering
                // const myBlogNew = MyBlogs.filter((blog)=> blog._id !== blogId);
                // setMyBlogs(myBlogNew);
            }else{
                alert(res.data.message);
            }
            
        }).catch(err=>{
            alert(err);
        })
    }

    function handleEditBlog(e, blogId){
      e.preventDefault();

      const newBlogObj = {
          blogId,
          title,
          textBody
      }
      axios.put(`${process.env.REACT_APP_BACKEND_URL}/blog/edit-blog`, newBlogObj, { 
          headers: {'x-acciojob': token}
      }).then(res=>{

        setIsEdit(false);
        alert(res.data.message);
        window.location.reload();
          // if(res.data.status===201){
          //     window.location.href = '/my-blogs';
          // }else{
          //     alert(res.data.message);
          // }
      }).catch(err=>{
          alert('Not allowed to edit after 30 minutes of creation the blog!');
      })

  }
  return (
    <Card style={{ width: "100%" , marginBottom: "20px"}} key={props._id}>
      <Card.Body>
      <Card.Text> {(props.username)}</Card.Text>
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <Card.Title>{props.title}</Card.Title>

           
          <Card.Text> {formatDateAndTime(new Date(props.creationDateTime))}</Card.Text>
        </div>
        <Card.Text>{props.textBody}</Card.Text>
        {homePage? <></>:
        <div style={{display: "flex", justifyContent: "flex-end"}}>
        <Button variant="success" style={{ marginRight: "10px" }} onClick={()=> setIsEdit(!isEdit)}>
          Edit Blog
        </Button>
        <Button variant="danger" onClick={(e)=>handleDelete(e,props._id)}>Delete Blog</Button>{" "}
        </div>
        }
        {isEdit? <><Form onSubmit={(e)=> handleEditBlog(e,props._id)}>
        <h1
          style={{
            marginBottom: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Edit the blog
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
          Edit Blog
        </Button>{" "} 
        
      </Form></>: <></>}
      </Card.Body>
    </Card>
  );
}

export default BlogCard;
