import landingImage from "../assets/landing.png"
import appDownloadImage from "../assets/appDownload.png"

const HomePage = () => {
    return (
      <div className="flex flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-orange-600">
            Discover Culinary Delights at Your Doorstep
          </h1>
          <span className="text-lg sm:text-xl">Bringing gourmet experiences to your home</span>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
            <img src={landingImage} alt="Delicious food display" className="w-full h-auto rounded-lg "/>
            <div className="flex flex-col items-center text-center justify-center gap-4">
                <span className="font-bold text-3xl tracking-tighter">Elevate Your Dining Experience</span>
                <span>Download our app for exclusive offers and personalized recommendations</span>
                <img src={appDownloadImage} alt="App download options" className="max-w-full h-auto"/>
            </div>
        </div>
      </div>
    );
  };
  
export default HomePage;