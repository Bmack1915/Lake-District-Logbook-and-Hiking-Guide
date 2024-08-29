import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LoginAndFetchUserInfo, register } from "../redux/userSlice";
import { Loading } from "../Components/Utilities/Loading";
import { useState } from "react";
import { API_BASE_URL } from "../Components/Utilities/apiConfig";
import axios from "axios";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  //Get previous location from the redirected route,
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    if (!email || !password) {
      toast.error("Please fill out all required fields");
      return;
    }

    setIsLoading(true);

    try {
      if (isRegistering) {
        const firstName = e.target.elements.firstName.value;
        const surname = e.target.elements.surname.value;
        if (!firstName || !surname) {
          toast.error("Please provide both first name and surname");
          return;
        }

        const newUser = {
          email,
          password,
          FirstName: firstName,
          Surname: surname,
        };

        const success = await RegisterUser(newUser);
        if (success) {
          dispatch(LoginAndFetchUserInfo(email, password));
          navigate(from, { replace: true });
        }
      } else {
        try {
          const res = await dispatch(LoginAndFetchUserInfo(email, password));
          if (
            res.response &&
            res.response.status >= 400 &&
            res.response.status < 500
          ) {
            console.log("ERROR");
          } else if (res && res.status >= 200 && res.status < 300) {
            navigate(from, { replace: true });
          } else {
            console.log("Unexpected status code:", res.response.status);
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  async function RegisterUser(newUser) {
    try {
      const response = await axios.post(
        `${API_BASE_URL}account/register`,
        newUser,
      );
      if (response.status === 200) {
        toast.success("User Registered");
        dispatch(register(newUser.FirstName));
        return true;
      }
    } catch (error) {
      const errors = error.response.data.$values;
      errors.map((error) => toast.error(error.description));
      return false;
    }
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="h-25 mx-auto w-auto"
          src="assets/Wainwright Logbook.png"
          alt="Your Company"
        />

        <h2 className="text-gray-600 mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
          {!isRegistering ? "Sign in to your account" : "Register"}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit} method="POST">
          {isRegistering && (
            <div>
              <div>
                <label
                  // htmlFor="email"
                  className="text-gray-900 block text-sm font-medium leading-6"
                >
                  First Name
                </label>
                <div className="mt-2">
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="text"
                    required
                    className="text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  // htmlFor="email"
                  className="text-gray-900 block text-sm font-medium leading-6"
                >
                  Surname
                </label>
                <div className="mt-2">
                  <input
                    id="surname"
                    name="surname"
                    type="text"
                    autoComplete="text"
                    required
                    className="text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="text-gray-900 block text-sm font-medium leading-6"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6"
              >
                Password
              </label>
              {/* <div className="text-sm">
                <Link to="/">
                  <div className="font-semibold text-blue hover:text-lightblue">
                    {!isRegistering && "Forgot Password?"}
                  </div>
                </Link>
              </div> */}
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="hover:bg-indigo-500 focus-visible:outline-indigo-600 flex w-full justify-center rounded-md bg-blue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {isRegistering ? "Register" : "Sign in"}
            </button>
          </div>
        </form>

        <div className="mt-10 flex items-center justify-center">
          <p className="text-gray-500 px-5 text-center text-lg">
            {!isRegistering
              ? "Dont have an account?"
              : "Already have an account?"}
          </p>

          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-indigo-600 hover:text-indigo-500 font-semibold leading-6"
          >
            {!isRegistering ? "Register here?" : "Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
