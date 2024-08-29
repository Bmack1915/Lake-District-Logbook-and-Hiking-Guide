import React, { useEffect, useRef } from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const link = "/assets/lakedistrict/";

export default function SlideshowBackground({
  children,
  currentSlide = 0,
  opacity,
}) {
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
      >
        {images.map((image, index) => (
          <div className="each-slide" key={index}>
            <div
              style={{
                position: "relative",
                height: "90vh",
                width: "100%",
              }}
            >
              <div
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",

                  opacity: opacity,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: -1,
                }}
              />

              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  height: "100%",
                }}
              >
                {children}
              </div>
            </div>
          </div>
        ))}
      </Fade>
    </div>
  );
}
