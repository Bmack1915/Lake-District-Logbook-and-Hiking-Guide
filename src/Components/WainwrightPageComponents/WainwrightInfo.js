function WainwrightInfo({ wainwright, children }) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <div>
        <h1 className="pb-5 text-5xl font-bold">
          Wainwright: {wainwright.name}
        </h1>
        <p className="pb-5 text-xl">{wainwright.description}</p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <h2 className="mb-2 text-2xl font-semibold">Height</h2>
            <p className="text-lg">{wainwright.heightM} meters</p>
          </div>

          <div>
            <h2 className="mb-2 text-2xl font-semibold">Rank in Height</h2>
            <p className="text-lg">{wainwright.rankByHeight}</p>
          </div>

          <div>
            <h2 className="mb-2 text-2xl font-semibold">Latitude</h2>
            <p className="text-lg">{wainwright.latitude}</p>
          </div>

          <div>
            <h2 className="mb-2 text-2xl font-semibold">Longitude</h2>
            <p className="text-lg">{wainwright.longitude}</p>
          </div>

          <div className="col-span-2">
            <h2 className="mb-2 text-2xl font-semibold">Area</h2>
            <p className="text-lg">{wainwright.area}</p>
          </div>
        </div>

        <div className="pt-5">{children}</div>
      </div>
    </div>
  );
}

export default WainwrightInfo;
