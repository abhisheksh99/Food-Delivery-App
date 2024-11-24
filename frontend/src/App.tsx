import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./auth/Login";
import MainLayout from "./layout/MainLayout";
import Signup from "./auth/Signup";

export default function Home() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}
