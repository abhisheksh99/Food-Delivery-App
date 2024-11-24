import { Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
import MainLayout from "./layout/MainLayout";
import Signup from "./auth/Signup";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import VerifyEmail from "./auth/VerifyEmail";
import HeroSection from "./components/HeroSection";
import Profile from "./components/Profile";
import SearchPage from "./components/SearchPage";

export default function Home() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index={true} element={<HeroSection />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search/:id" element={<SearchPage/>} />

        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Routes>
    </>
  );
}
