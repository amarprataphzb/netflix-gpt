import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
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

      <form className=" absolute w-3/12 p-12 bg-black bg-opacity-80 my-36 mx-auto right-0 left-0 text-white">
        <h1 className="font-bold text-white text-3xl py-4 first-line:">
          {isSignInForm?"Sign In":"Sign Up"}
        </h1>
        {
            !isSignInForm && (  <input
                type="text"
                className="p-4 my-4  rounded w-full bg-gray-700"
                placeholder="Full Name"
              />)
        }
      
        <input
          type="text"
          className="p-4 my-4  rounded w-full bg-gray-700"
          placeholder="Email or number"
        />
        <input
          type="password"
          className="p-4  rounded my-4 w-full bg-gray-700"
          placeholder="Password"
        />
        <button className="p-4 my-4 rounded w-full bg-red-700">{isSignInForm?"Sign In":"Sign Up"}</button>
        <p className="py-4" onClick={toggleSignInForm}>
        {isSignInForm?"New to Netflix? sign Up Now":"Already registered? Sign In Now"}
          
        </p>
      </form>
    </div>
  );
};

export default Login;  
