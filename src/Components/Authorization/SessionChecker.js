// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import apiClient from "../Utilities/axiosInterceptor";
// import { logout } from "../../redux/userSlice";

// const SessionChecker = ({ children }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const id = useSelector((state) => state.user.id);

//   useEffect(() => {
//     const checkSession = async () => {
//       try {
//         await apiClient.get("account/checksession");
//       } catch (error) {
//         if (
//           (error.response && error.response.status === 401) ||
//           (error.response && error.response.status === 403)
//         ) {
//           alert("Please login to use this feature");
//           dispatch(logout());
//           navigate("/login");
//         }
//       }
//     };

//     checkSession();
//   }, [dispatch, navigate, id]);

//   return <>{children}</>;
// };

// export default SessionChecker;
