import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import {useDispatch } from "react-redux"
import  {addUser, removeUser } from '../utils/userSlice'
const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch=useDispatch()
  const navigate = useNavigate();

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const fullName = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleClickButton = (e) => {
    e.preventDefault();

    // Validate form data
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    if (message) return;

    if (!isSignInForm) {
      // Sign-up logic
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          // Update profile with display name and photo URL
          updateProfile(user, {
            displayName: fullName.current?.value, // Ensure fullName is defined
            photoURL: "https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
          })
          .then(() => {
            const { uid,email,displayName,photoURL }= user;
            dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}));
          }).catch((error) => {
            console.error("Error updating profile", error);
          });
               
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(errorCode, errorMessage);
          setErrorMessage(`${errorCode}: ${errorMessage}`);
        });
    } else {
      // Sign-in logic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(errorCode, errorMessage);
          setErrorMessage(`${errorCode}: ${errorMessage}`);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          alt="bg-image"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/826348c2-cdcb-42a0-bc11-a788478ba5a2/6d20b198-e7ab-4e9f-a1aa-666faa0298f9/IN-en-20240729-POP_SIGNUP_TWO_WEEKS-perspective_WEB_a67d8c9e-8121-4a74-98e4-8005eb2df227_medium.jpg"
        />
      </div>

      <form className="absolute w-3/12 p-12 bg-black bg-opacity-80 my-36 mx-auto right-0 left-0 text-white">
        <h1 className="font-bold text-white text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={fullName}
            type="text"
            className="p-4 my-4 rounded w-full bg-gray-700"
            placeholder="Full Name"
          />
        )}
        <input
          ref={email}
          type="text"
          className="p-4 my-4 rounded w-full bg-gray-700"
          placeholder="Email or number"
        />
        <input
          ref={password}
          type="password"
          className="p-4 my-4 rounded w-full bg-gray-700"
          placeholder="Password"
        />
        <p className="text-red-700 font-normal text-lg">{errorMessage}</p>
        <button
          className="p-4 my-4 rounded w-full bg-red-700"
          onClick={handleClickButton}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already registered? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
