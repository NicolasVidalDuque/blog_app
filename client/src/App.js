import "./App.css";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import IndexPage from "./components/Pages/IndexPage";
import LoginPage from "./components/Pages/LoginPage";
import Registerpage from "./components/Pages/RegisterPage";
import {UserContexProvider} from "./context/UserContext";
import CreatePost from "./components/Pages/CreatePost";
import PostPage from "./components/Pages/PostPage";
import EditPost from "./components/Pages/EditPost";

// TODO: state has to be stored in App.js, useContext
function App() {
  return (
    <UserContexProvider>
      <Routes> 
        <Route path="/" element={<Layout />}>
            <Route  index element={<IndexPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Registerpage />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/edit/:id" element={<EditPost/>} />
        </Route>
      </Routes>
    </UserContexProvider>
  );
}

export default App;
