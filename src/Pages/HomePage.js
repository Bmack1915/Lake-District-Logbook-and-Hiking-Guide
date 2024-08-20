import { useState } from "react";
import AppInformation from "../Components/HomePageComponents/AppInformation";
import SlideshowBackground from "../Components/HomePageComponents/SlideshowBackground";
import SlideshowContent from "../Components/HomePageComponents/SlideshowContent";

function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  return (
    <div>
      <SlideshowBackground currentSlide={currentSlide}>
        <SlideshowContent setCurrentSlide={setCurrentSlide} />
      </SlideshowBackground>
      <AppInformation />
    </div>
  );
}

export default HomePage;
