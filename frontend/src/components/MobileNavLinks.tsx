import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";

const MobileNavLinks = () => {
    const {logout} = useAuth0()
    return (
        <>
            <Link to="/user-profile" className="flex items-center bg-white font-bold hover:text-orange-500 px-4 py-2 rounded-md">
                User Profile
            </Link>
            <Button onClick = {()=>logout()}className="flex items-center px-4 py-2 font-bold bg-orange-500 hover:bg-gray-500 rounded-md">
                Logout
            </Button>
        </>
    );
};

export default MobileNavLinks;