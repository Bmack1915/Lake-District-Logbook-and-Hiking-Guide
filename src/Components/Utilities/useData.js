// import { useState, useEffect } from "react";
// import axios from "axios";
// import { API_BASE_URL } from "./apiConfig";
// import { Loading } from "./Loading";

// export function useData(id, dataType) {
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   // UseEffect to load data
//   useEffect(() => {
//     const fetchUserWainwrightData = async () => {
//       try {
//         const res = await axios.get(`${API_BASE_URL}userwainwrights/${userId}`);
//         console.log(res.data);
//         setData(res.data);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (userId) {
//       fetchUserWainwrightData();
//     }
//   }, [userId]);

//   if (isLoading) {
//     return <Loading />;
//   }

//   return { route, isLoading };
// }
