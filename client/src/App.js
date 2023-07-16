import "./App.css";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import IndexPage from "./components/Pages/IndexPage";
import LoginPage from "./components/Pages/LoginPage";
import Registerpage from "./components/Pages/RegisterPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/register"} element={<Registerpage />} />
      </Route>
    </Routes>
  );
}

export default App;
