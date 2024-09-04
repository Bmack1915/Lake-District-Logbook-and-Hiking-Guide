import { Divider } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AppInformation() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);
  const features = [
    {
      title: "Comprehensive Wainwright Database",
      desc: "Explore the complete collection of all 214 Wainwright fells. Each entry is packed with detailed information, including descriptions, heights, locations, and more, allowing you to prepare for each climb with confidence and insight.",
    },
    {
      title: "Wainwright Finder",
      desc: "Keep track of your progress effortlessly. The Wainwright Finder shows you at a glance which fells you've conquered and which are still waiting to be explored. Easily search for new fells to add to your journey, and plan your next adventure with this intuitive tool.",
    },
    {
      title: "Personalized Logbook",
      desc: "Capture every moment of your Wainwright Challenge in your own personalized logbook. Record your climbs with dates, notes, and photos, creating a digital keepsake that reflects your unique journey. Watch your logbook grow as you work your way through the fells.",
    },
    {
      title: "Route Finder",
      desc: "Discover the best walks across the Lake District with our Route Finder. Whether you're looking for a leisurely stroll or an ambitious multi-fell trek, this feature helps you find the perfect route. Tailored to your preferences, the Route Finder makes it easy to plan your next adventure in one of England’s most beautiful regions.",
    },
  ];

  function handleNavigate() {
    navigate("/login");
  }
  return (
    <div>
      <div className="flex flex-col items-center justify-center bg-white bg-opacity-75">
        <div className="text-center">
          <h1 className="p-10 text-5xl font-extrabold">
            Welcome to the Wainwright Logbook App
          </h1>
          <p className="mx-auto max-w-3xl text-lg">
            Embark on your journey to conquer the legendary Wainwright Challenge
            with the ultimate companion designed specifically for adventurers
            like you. The Wainwright Logbook App is your all-in-one guide to
            exploring the 214 fells documented by Alfred Wainwright in his
            iconic "Pictorial Guide to the Lakeland Fells."
          </p>
        </div>
        <div className="mt-10 flex space-x-4">
          {!token.length > 0 && (
            <div className="flex">
              <Button
                onPress={handleNavigate}
                className="mx-5 rounded-lg bg-green px-6 py-3 text-white"
              >
                Login
              </Button>
              <Button
                onPress={handleNavigate}
                className="rounded-lg bg-blue px-6 py-3 text-white"
              >
                Register
              </Button>
            </div>
          )}
        </div>

        <Divider className="m-4 h-1 w-1/2" />

        <div className="w-full px-10 pt-4 md:px-40">
          <h2 className="text-gray-800 text-3xl font-bold">
            What are the Wainwrights?
          </h2>
          <p className="text-md text-gray-600 mt-4">
            The Wainwrights are a collection of 214 fells (hills and mountains)
            located in the Lake District of England. They were meticulously
            documented by Alfred Wainwright in his seven-volume series, "A
            Pictorial Guide to the Lakeland Fells," published between 1955 and
            1966. These fells vary in height and difficulty, ranging from the
            modest Castle Crag (290 meters) to the towering Scafell Pike (978
            meters), England's highest peak. The Wainwrights have become a
            popular challenge for hikers, who aim to climb all 214 as part of
            the "Wainwright Challenge."
          </p>
          <Divider className="mt-4 h-1 w-1/2" />
          {features.map((feature, index) => (
            <div key={index} className="mb-8">
              <h1 className="text-gray-800 pt-3 text-xl font-bold">
                {index + 1}. {feature.title}
              </h1>
              <p className="text-gray-600 pt-2">{feature.desc}</p>
            </div>
          ))}
          <h3 className="text-gray-800 pb-5 pt-5 text-xl font-bold">
            Whether you’re starting new or deep into your journey, our app will
            help you plan, track, and celebrate every step of your journey
            through the Lake District.
          </h3>
        </div>
      </div>
    </div>
  );
}

export default AppInformation;
