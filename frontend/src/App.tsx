import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
import MainLayout from "./layout/MainLayout";
import Signup from "./auth/Signup";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import VerifyEmail from "./auth/VerifyEmail";
import HeroSection from "./components/HeroSection";
import Profile from "./components/Profile";
import SearchPage from "./components/SearchPage";
import ResturantDetails from "./components/ResturantDetails";
import Cart from "./components/Cart";
import Resturant from "./admin/Resturant";
import AddMenu from "./admin/AddMenu";
import Orders from "./admin/Orders";
import Order from "./components/Order";
import { useUserStore } from "./store/useUserStore";


const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user?.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }
  return children;
};

const AuthenticatedUser = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  if(isAuthenticated && user?.isVerified){
    return <Navigate to="/" replace/>
  }
  return children;
};

const AdminRoute = ({children}:{children:React.ReactNode}) => {
  const {user, isAuthenticated} = useUserStore();
  if(!isAuthenticated){
    return <Navigate to="/login" replace/>
  }
  if(!user?.admin){
    return <Navigate to="/" replace/>
  }

  return children;
}

export default function Home() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProtectedRoutes><MainLayout /></ProtectedRoutes>}>
          <Route index={true} element={<HeroSection />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search/:id" element={<SearchPage/>} />
          <Route path="/restaurant/:id" element={<ResturantDetails/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/order/status" element={<Order/>} />


          {/* Admin */}
          <Route path="/admin/restaurant" element={<AdminRoute><Resturant/></AdminRoute>} />
          <Route path="/admin/menu" element={<AdminRoute><AddMenu/></AdminRoute>} />
          <Route path="/admin/orders" element={<AdminRoute><Orders/></AdminRoute>} />

        </Route>

        <Route path="/login" element={<AuthenticatedUser><Login /></AuthenticatedUser>} />
        <Route path="/signup" element={<AuthenticatedUser><Signup /></AuthenticatedUser>} />
        <Route path="/forgot-password" element={<AuthenticatedUser><ForgotPassword /></AuthenticatedUser>} />
        <Route path="/reset-password" element={<AuthenticatedUser><ResetPassword /></AuthenticatedUser>} />
        <Route path="/verify-email" element={<AuthenticatedUser><VerifyEmail /></AuthenticatedUser>} />
      </Routes>
    </>
  );
}
