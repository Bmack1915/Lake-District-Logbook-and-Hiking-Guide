import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LoginAndFetchUserInfo } from "../redux/userSlice";
import { Loading } from "../Components/Utilities/Loading";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    try {
      await dispatch(LoginAndFetchUserInfo(email, password));
      navigate("/home");
    } catch {
      <Loading />;
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="h-25 mx-auto w-auto"
          src="assets/wainwrightLogbook.png"
          alt="Your Company"
        />

        <h2 className="text-gray-600 mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit} method="POST">
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
                className="text-gray-900 block text-sm font-medium leading-6"
              >
                Password
              </label>
              <div className="text-sm">
                <Link to="/">
                  <div className="text-indigo-600 hover:text-indigo-500 font-semibold">
                    Forgot Password?
                  </div>
                </Link>
              </div>
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
              className="bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600 flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Sign in
            </button>
          </div>
        </form>
        <div className="mt-10 flex items-center justify-center">
          <p className="text-gray-500 text-center text-sm">Not a member?</p>
          <Link to="/register" className="ml-2">
            <button className="text-indigo-600 hover:text-indigo-500 font-semibold leading-6">
              Register here
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
