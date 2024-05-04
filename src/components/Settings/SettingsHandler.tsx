import DisplaySection from "./DisplaySection";
import GalerySection from "./Galery/GalerySection";
import HintSection from "./HintSection";
import NewsSection from "./NewsSection";
import ScreensSection from "./Screen/ScreensSection";
import WeatherSection from "./WeatherSection";

export default function SettingsHandler() {
  return (
    <div className="text-white w-full">
      <div className="w-full bg-[#121212] text-center sticky">
        <h1 className="text-xl p-2 font-semibold">ZARZĄDZANIE TV</h1>
      </div>
      <div className="px-4 py-2">
        <ScreensSection />
        <DisplaySection />
        <HintSection />
        <WeatherSection />
        <NewsSection />
        <GalerySection />
      </div>
    </div>
  );
}
