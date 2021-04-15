import React, { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";
import { doesUsernameExist } from "../services/firebase";

export default function SignUp() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const isInvalid = password === "" || emailAddress === "";

  const handleSignUp = async (event) => {
    event.preventDefault();

    const usernameExists = await doesUsernameExist(username);

    if (!usernameExists.length) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(emailAddress, password);

        //adding data  to auth
        await createdUserResult.user.updateProfile({
          displayName: username,
        });

        // Adding adata to firestore
        await firebase
          .firestore()
          .collection("users")
          .add({
            userId: createdUserResult.user.uid,
            username: username.toLowerCase(),
            fullName,
            emailAddress: emailAddress.toLowerCase(),
            following: ["2"],
            followers: [],
            dateCreated: Date.now(),
          });

        history.push(ROUTES.DASHBOARD);

      } catch (error) {
        setFullName("");
        setEmailAddress("");
        setPassword("");
        setError(error.message);
      }
    } else {
      setUsername("");
      setError("That username is already taken, please try another.");
    }
    // try {
    // } catch (error) {}
  };

  useEffect(() => {
    document.title = "Sign Up - Instagram";
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
            <form onSubmit={handleSignUp} method="post">
              <input
                aria-label="Enter your Username"
                type="text"
                placeholder="Username"
                className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2 outline-none  focus:ring focus:ring-blue-medium focus:ring-opacity-50"
                onChange={({ target }) => setUsername(target.value)}
                value={username}
              />
              <input
                aria-label="Enter your Full Name"
                type="text"
                placeholder="Full Name"
                className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2 outline-none  focus:ring focus:ring-blue-medium focus:ring-opacity-50"
                onChange={({ target }) => setFullName(target.value)}
                value={fullName}
              />
              <input
                aria-label="Enter your email address"
                type="text"
                placeholder="Email address"
                className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2 outline-none  focus:ring focus:ring-blue-medium focus:ring-opacity-50"
                onChange={({ target }) => setEmailAddress(target.value)}
                value={emailAddress}
              />
              <input
                aria-label="Enter your password"
                type="password"
                placeholder="Password"
                className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2 outline-none  focus:ring focus:ring-blue-medium focus:ring-opacity-50"
                onChange={({ target }) => setPassword(target.value)}
                value={password}
              />
              <button
                disabled={isInvalid}
                type="submit"
                className={`bg-blue-medium text-white w-full rounded h-8 font-bold focus:outline-none focus:ring focus:ring-blue-medium focus:ring-opacity-50 ${
                  isInvalid && "opacity-50"
                }`}
              >
                Sign Up
              </button>
            </form>
          </div>
          <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary rounded ">
            <p className="text-sm">
              Have an account?{` `}
              <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
