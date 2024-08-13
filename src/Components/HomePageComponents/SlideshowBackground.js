import React, { useEffect, useRef, useState } from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import SlideshowContent from "./SlideshowContent";

const link = "/assets/lakedistrict/";

export default function SlideshowBackground() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slideshowRef = useRef(null);
  const images = [
    `${link}ambleside.jpg`,
    `${link}lakewithstumps.jpg`,
    `${link}buttermere.jpg`,
    `${link}buttermerelake.jpg`,
    `${link}coniston.jpg`,
    `${link}duddon.jpg`,
    `${link}coniston2.jpg`,
    `${link}ennerdale.jpg`,
    `${link}grasmere.jpg`,
    `${link}gummershow.jpg`,
    `${link}haweswater.jpg`,
    `${link}lakenight.jpg`,
    `${link}langdale.jpg`,
    `${link}langdale2.jpg`,
    `${link}keswick.jpg`,
    `${link}langdaleWinter.jpg`,
    `${link}sheep2.jpg`,
    `${link}loughrigg.jpg`,
    `${link}loughrigg2.jpg`,
    `${link}rydal.jpg`,
    `${link}langdaleWinter.jpg`,
    `${link}sheep.jpg`,
  ];

  //If current slide is manually updated in the content i.e. doesn't match the current reference, update the photo behind manually
  useEffect(() => {
    if (slideshowRef.current) {
      slideshowRef.current.goTo(currentSlide + 2);
    }
  }, [currentSlide]);

  return (
    <div>
      <Fade
        ref={slideshowRef}
        duration={5000}
        indicators={false}
        autoplay={true}
        infinite={true}
        arrows={false}
        defaultIndex={currentSlide}
        // onStartChange={handleSlideChange}
      >
        {images.map((image, index) => (
          <div className="each-slide" key={index}>
            <div
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "90vh",
                width: "100%",
              }}
            >
              <SlideshowContent setCurrentSlide={setCurrentSlide} />
            </div>
          </div>
        ))}
      </Fade>
    </div>
  );
}
