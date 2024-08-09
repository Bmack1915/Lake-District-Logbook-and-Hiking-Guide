import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import { LiaHikingSolid } from "react-icons/lia";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="grid h-screen grid-cols-5 grid-rows-5 gap-4 sm:h-full">
      <div
        className="col-span-2 col-start-4 row-span-5 row-start-1 h-auto bg-cover bg-center"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}assets/stonecircle.jpg)`,
        }}
      ></div>
      <div className="col-span-3 col-start-1 row-span-2 row-start-1 border-b-4 p-5">
        <h1 className="text-9xl font-bold">Wainwright Logbook ⛰</h1>
        <p className="pt-4 text-4xl">
          Your home for completing all 214 Wainwrights in the Lake District
        </p>
      </div>
      <div className="col-span-3 row-span-3 row-start-3 p-5">
        <p className="font-bold">
          Discover the challenge of conquering the Lake District’s 214
          Wainwrights, meticulously documented by Alfred Wainwright. His
          detailed guidebooks have inspired generations of hikers. Whether
          you’re a seasoned adventurer or a curious explorer, our app is your
          perfect companion, helping you track your progress, find detailed
          routes, and share your experiences.
        </p>

        <div className="mt-5 flex items-center justify-center p-10">
          <Accordion>
            <AccordionItem
              key="1"
              aria-label="Accordion 1"
              title={
                <p className="text-black text-3xl font-bold">
                  1. Finding and Marking Wainwrights
                </p>
              }
            >
              <p className="text-gray-300">
                Complete Keep track of your hiking achievements by marking each
                Wainwright as complete. Add personal notes of routes, rate the
                difficulty, and share your experiences.
              </p>
            </AccordionItem>
            <AccordionItem
              key="2"
              aria-label="Accordion 2"
              title={
                <p className="text-black text-3xl font-bold">
                  2. Use Our Route Finder to Help Guide You
                </p>
              }
            >
              <p className="text-gray-300">
                Search for routes with comprehensive descriptions and
                downloadable GPX files to guide your journey. Our app offers a
                variety of routes tailored to different skill levels and
                preferences. Filter by length, difficulty, and other criteria to
                find the perfect hike for your skill level and interests,
                ensuring you have the best information for a safe and enjoyable
                adventure.
              </p>
            </AccordionItem>
            <AccordionItem
              key="3"
              aria-label="Accordion 3"
              title={
                <p className="text-black text-3xl font-bold">
                  3. Track your progress
                </p>
              }
            >
              <p className="text-gray-300">
                {" "}
                Your personalized logbook visually showcases your
                accomplishments, motivating you to explore more and complete
                your Wainwright journey. Embark on your Lake District adventure
                with our Wainwright Logbook app and immerse yourself in the
                breathtaking landscapes of one of the UK’s most iconic hiking
                destinations.
              </p>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="flex w-144 justify-start p-16">
          <Link to="/home">
            <Button color="primary" size="lg">
              Get Started <LiaHikingSolid />
              <FaLongArrowAltRight />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
