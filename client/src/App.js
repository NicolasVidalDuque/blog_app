import "./App.css";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import IndexPage from "./components/Pages/IndexPage";
import LoginPage from "./components/Pages/LoginPage";
import Registerpage from "./components/Pages/RegisterPage";
import {UserContexProvider} from "./context/UserContext";


// TODO: state has to be stored in App.js, useContext
function App() {
  return (
    <UserContexProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route  index element={<IndexPage />} />
          <Route path={"/login"} element={<LoginPage />} />
          <Route path={"/register"} element={<Registerpage />} />
        </Route>
      </Routes>
    </UserContexProvider>
  );
}

export default App;
