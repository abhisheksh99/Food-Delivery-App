import { Navigate, Route, Routes } from "react-router-dom"

const AppRoutes  = () =>{
    return(
        <Routes>
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="/user-profile" element={<h1>User Profile</h1>} />
            <Route path="*" element={<Navigate to="/"/>} />

        </Routes>
    )
}

export default AppRoutes