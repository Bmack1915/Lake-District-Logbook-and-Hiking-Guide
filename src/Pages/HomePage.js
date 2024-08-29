import { useState } from "react";
import AppInformation from "../Components/HomePageComponents/AppInformation";
import SlideshowBackground from "../Components/HomePageComponents/SlideshowBackground";
import HomepageSlides from "../Components/HomePageComponents/HomePageSlides";

function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  return (
    <div>
      <SlideshowBackground currentSlide={currentSlide}>
        <HomepageSlides setCurrentSlide={setCurrentSlide} />
      </SlideshowBackground>
      <AppInformation />
    </div>
  );
}

export default HomePage;
