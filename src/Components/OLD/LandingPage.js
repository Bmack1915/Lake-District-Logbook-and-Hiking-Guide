import { Accordion, AccordionItem } from "@nextui-org/react";

function LandingPage() {
  return (
    <section
      className="relative h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/image.png)` }}
    >
      <div className="grid h-full grid-cols-2">
        <div className="grid-span-1 flex flex-col items-center justify-start py-10">
          <h1 className="text-gray-light mb-2 flex justify-center text-5xl font-bold text-white">
            Explore the Wainwrights
          </h1>
          <p className="text-gray-light text-xl">
            Your place to record adventure
          </p>
          <button className="text-gray-light rounded-full bg-white px-4 py-2 font-bold text-white">
            Get Started
          </button>
        </div>

        <div className="grid-span-1 flex items-center rounded-lg">
          <div className="w-full flex-col rounded-xl bg-foreground-100 bg-opacity-35 align-middle">
            <Accordion>
              <AccordionItem
                key="1"
                aria-label="Accordion 1"
                title={
                  <p className="text-3xl font-bold text-black">
                    Log Wainwrights
                  </p>
                }
              >
                <p className="text-gray-300">Record your Wainwright Progress</p>
              </AccordionItem>
              <AccordionItem
                key="2"
                aria-label="Accordion 2"
                title={
                  <p className="text-3xl font-bold text-black">Find Routes</p>
                }
              >
                <p className="text-gray-300">
                  Find Routes to help you on the way
                </p>
              </AccordionItem>
              <AccordionItem
                key="3"
                aria-label="Accordion 3"
                title={
                  <p className="text-3xl font-bold text-black">
                    Track your progress
                  </p>
                }
              >
                <p className="text-gray-300">Other</p>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      <div className="absolute bottom-64 flex w-full justify-between px-4">
        <button className="bg-gray-light rounded-full bg-white bg-opacity-50 p-2">
          <span className="sr-only">Previous</span>
          <svg
            className="h-6 w-6 text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button className="bg-gray-light rounded-full bg-white bg-opacity-50 p-2">
          <span className="sr-only">Next</span>
          <svg
            className="h-6 w-6 text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}

export default LandingPage;
