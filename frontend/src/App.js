
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Register from './pages/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Home from './pages/Home';
import CreateBlog from './pages/CreateBlog';
import MyBlogs from './pages/MyBlogs';
import FollowerList from './pages/FollowerList';
import FollowingList from './pages/FollowingList';
import Users from './pages/Users';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/create-blog" element={<CreateBlog/>}/>
        <Route path="/my-blogs" element={<MyBlogs/>}/>
        <Route path="/follower-list" element={<FollowerList/>}/>
        <Route path="/following-list" element={<FollowingList/>}/>
        <Route path="/users-list" element={<Users/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
