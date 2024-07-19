import { API_BASE_URL } from "./apiConfig";
import axios from "axios";
import { setWainwrights } from "../../redux/wainwrightSlice";
import { useDispatch } from "react-redux";

// export default async function fetchWainwrightData() {
//   const dispatch = useDispatch();
//   const res = await axios.get(`${API_BASE_URL}Wainwrights`);
//   const data = await res.data.$values;
//   dispatch(setWainwrights(data));
// }
