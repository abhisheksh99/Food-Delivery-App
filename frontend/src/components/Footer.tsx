const Footer = () => {
    const currentYear = new Date().getFullYear();
  
    return (
      <footer className="bg-orange-500 py-8">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
          <span className="text-3xl text-white font-bold tracking-tight mb-4 md:mb-0">
            Flavour Fiesta
          </span>
          
          <div className="flex flex-col md:flex-row items-center gap-6 text-white">
            <span className="text-sm">
              © {currentYear} Flavour Fiesta. All rights reserved.
            </span>
            
            <span className="hidden md:block h-6 w-px bg-white"></span> {/* Divider */}
            
            <span className="text-sm font-bold tracking-tight hover:text-gray-200 cursor-pointer transition-colors duration-200 ease-in-out">
              Privacy Policy
            </span>
            
            <span className="text-sm font-bold tracking-tight hover:text-gray-200 cursor-pointer transition-colors duration-200 ease-in-out">
              Terms of Service
            </span>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  