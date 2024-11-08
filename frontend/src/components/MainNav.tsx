import { Button } from "./ui/button";

const MainNav = () => {
  return (
    <nav className="flex items-center justify-end p-4">
      <Button
        variant="ghost"
        className="font-semibold text-sm sm:text-base px-4 py-2 rounded-full 
                   text-gray-700 hover:text-orange-500 
                   bg-white hover:bg-orange-50 
                   border border-gray-200 hover:border-orange-300
                   shadow-sm hover:shadow-md 
                   transition-all duration-300 ease-in-out 
                   transform hover:scale-105"
      >
        Login
      </Button>
    </nav>
  );
};

export default MainNav;