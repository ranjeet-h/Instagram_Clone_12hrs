import React, { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import FirebaseContext from "./../context/firebase";
import * as ROUTES from "../constants/routes";

export default function Login() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const isInvalid = password === "" || emailAddress === "";

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
      history.push(ROUTES.DASHBOARD);
    } catch (error) {
      setEmailAddress("");
      setPassword("");
      setError(error.message);
    }
  };

  useEffect(() => {
    document.title = "Login-Instagram";
  }, []);

  return (
    <>
      <div className="container flex mx-auto max-w-screen-md items-center h-screen">
        <div className="flex w-3/5">
          <img
            className="max-w-full"
            src="/images/iphone-with-profile.jpg"
            alt="iPhone with Instagram app"
          />
        </div>
        <div className="flex flex-col w-2/5">
          <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
            <h1 className="flex justify-center w-full">
              <img
                className="mt-2 w-6/12 mb-4"
                src="/images/logo.png"
                alt="instagram"
              />
            </h1>
            {error && (
              <div
                class="bg-red-lightest border-l-4 border-red-primary text-red-dark p-4 mb-4"
                role="alert"
              >
                <p class="font-bold">Be Warned</p>
                <p>{error}</p>
              </div>
              // <p className="mb-4 text-xs text-red-primary font-medium subpixel-antialiased">
              //   {error}
              // </p>
            )}
            <form onSubmit={handleLogin} method="post">
              <input
                aria-label="Enter your email address"
                type="text"
                placeholder="Email address"
                className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2 outline-none  focus:ring focus:ring-blue-medium focus:ring-opacity-50"
                onChange={({ target }) => setEmailAddress(target.value)}
              />
              <input
                aria-label="Enter your password"
                type="password"
                placeholder="Password"
                className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2 outline-none  focus:ring focus:ring-blue-medium focus:ring-opacity-50"
                onChange={({ target }) => setPassword(target.value)}
              />
              <button
                disable={isInvalid}
                type="submit"
                className={`bg-blue-medium text-white w-full rounded h-8 font-bold focus:outline-none focus:ring focus:ring-blue-medium focus:ring-opacity-50 ${
                  isInvalid && "opacity-50"
                }`}
              >
                Log In
              </button>
            </form>
          </div>
          <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary rounded ">
            <p className="text-sm">
              Don't have an account?{` `}
              <Link to="/signup" className="font-bold text-blue-medium">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
