import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";


function Header() {
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");
  
  
  
  //  let verified = jwt.verify(token, process.env.JWT_SECRET);

  //  console.log(verified);
  

  function handleLogout(){
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    window.location.href = '/login';
  }
  return (
    

    <Navbar className="bg-body-tertiary" expand="lg">
      <Container>
        <Navbar.Brand href="/">Blogging App</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="m-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/create-blog">Create Blog</Nav.Link>
            <Nav.Link href="my-blogs">My Blogs</Nav.Link>
            <Nav.Link href="follower-list">Followers</Nav.Link>
            <Nav.Link href="following-list">Followings</Nav.Link>
            <Nav.Link href="users-list">Users</Nav.Link>
          </Nav>
          <Nav className="ml-auto">

            {token ? <div style={{display: "flex", gap: "15px"}}><Navbar.Text >Hi, {name}</Navbar.Text> <Button variant="dark"onClick={handleLogout}>Logout</Button></div>: 
           <> <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link> </>
          }
            
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
