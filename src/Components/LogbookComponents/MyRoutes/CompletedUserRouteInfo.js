function CompletedUserRouteInfo({ userRoute }) {
  return (
    <div className="w-80 rounded-lg bg-white p-4 shadow-md">
      <div class="flex items-center space-x-4">
        <h2 class="text-lg font-semibold">{userRoute.route.name}</h2>
        <p class="text-gray-600 flex-grow">{userRoute.route.description}</p>
      </div>
      <p className="text-gray-600">"{userRoute.description}"</p>
      <p className="text-gray-500">
        {new Date(userRoute.date).toLocaleDateString()}
      </p>
      <p className="text-gray-500">{userRoute.difficultyRating}</p>
    </div>
  );
}

export default CompletedUserRouteInfo;
