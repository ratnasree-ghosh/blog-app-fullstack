import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


function UserCard({props}) {

  const token = localStorage.getItem("token");

   function handleFollow(userId){

    const followObj = {followingUserId: userId};
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/follow/follow-user`, followObj, {
      headers: {
        "x-acciojob": token,
      },
    }).then(res=>{
      alert("Successfully followed user");
      window.location.reload();
    }).catch(err=>{
      alert(err);
    })
  }

  function handleUnfollow(userId){
    const unfollowObj = {followingUserId: userId};
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/follow/unfollow-user`, unfollowObj, {
      headers: {
        "x-acciojob": token,
      },
    }).then(res=>{
      alert("Successfully unfollowed user");
      window.location.reload();
    }).catch(err=>{
      alert(err);
    })
  }
  
  return (
   
    <Card style={{ width: '16rem', margin: "10px" }}>
      
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>{props.username}</Card.Text>
        <Card.Text>{props.email}</Card.Text>
        {props.follow? (
          <>
          <Button variant="danger" onClick={() => handleUnfollow(props._id)}>Unfollow</Button>
          </>
        ): (<>
          <Button variant="primary" onClick={() => handleFollow(props._id)}>Follow</Button>
          </>) }
        
      </Card.Body>
    </Card>

    
  );
}

export default UserCard;