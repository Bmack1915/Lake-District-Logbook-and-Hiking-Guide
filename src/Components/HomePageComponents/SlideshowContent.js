import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

export default function SlideshowContent({ setCurrentSlide }) {
  const slides = [
    {
      title: "Wainwright Logbook",
      desc: "Log your achievements on this journey set out by Alfred Wainwright",
    },
    {
      title: "Track your progress",
      desc: "Add to your Wainwright collection to keep track of your progress",
    },
    {
      title: "Locate your next ascent with the Wainwright Finder",
      desc: "Unsure what to ascend next? Use the Wainwright finder to find a desired hike",
    },
    {
      title: "Record your experiences ",
      desc: "Record detailed logs of Wainwright ascents",
    },
  ];

  function setCurrentSlideIndex(prev, next) {
    setCurrentSlide(next);
  }

  return (
    <div>
      <Fade
        indicators={(index) => <div className="indicator">{index + 1}</div>}
        duration={5000}
        autoplay={true}
        arrows={true}
        onStartChange={setCurrentSlideIndex}
      >
        {slides.map((slide, index) => (
          <div
            style={{ height: "90vh", width: "100%" }}
            key={index}
            className="flex min-h-128 items-center justify-center font-bold text-white"
          >
            <div className="flex flex-col justify-center text-center">
              <h1 className="text-5xl">{slide.title}</h1>
              <p className="flex-wrap text-xl">{slide.desc}</p>
            </div>
          </div>
        ))}
      </Fade>
    </div>
  );
}
