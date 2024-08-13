import { createClient } from "pexels";
import { useEffect, useState } from "react";

function usePhotos(query) {
  const [photos, setPhotos] = useState([]);

  const client = createClient(
    "33rTC3aWH7rbiEJanC8HJ9lzMKU74qCPw2T3TMdpyHnmBksgycLd0USA",
  );

  useEffect(() => {
    async function getPhotos() {
      try {
        const response = await client.photos.search({ query, per_page: 1 });
        setPhotos(response.photos);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    }

    if (query) {
      getPhotos();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return photos;
}

export default usePhotos;
