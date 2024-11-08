import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import UsernameMenu from "./UsernameMenu";

const MainNav = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    return (
        <nav className="flex items-center justify-end p-4">
            <span className="flex space-x-2 items-center">
                {isAuthenticated ? (
                    <UsernameMenu />
                ) : (
                    <Button
                        variant="ghost"
                        className="font-semibold text-sm sm:text-base px-4 py-2 rounded-full 
                                   text-gray-700 hover:text-orange-500 
                                   bg-white hover:bg-orange-50 
                                   border border-gray-200 hover:border-orange-300
                                   shadow-sm hover:shadow-md 
                                   transition-all duration-300 ease-in-out 
                                   transform hover:scale-105"
                        onClick={() => loginWithRedirect()}
                    >
                        Login
                    </Button>
                )}
            </span>
        </nav>
    );
};

export default MainNav;