import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


const Header = () => {
  const navigate=useNavigate();
  

const user = useSelector(store=>store.user)
const signOut= async ()=>{


try {
  await auth.signOut();
  navigate("/")
  // Additional actions after sign-out
} catch (error) {
  navigate("/error")

}

}
  return (
    <div className="absolute flex justify-between py-2 bg-gradient-to-b from-black z-10 ">
      <div className="flex  gap full justify-between">
        <div>
          <img
            className="w-44 "
            alt="logo"
            src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
          />
        </div>
       {
        user?
        <div>
        <img src={user?.photoURL} height={30} width={30}/>
        <button className="text-white " onClick={signOut}>( sign out)</button>
      </div>:<div></div>
       }
      </div>
    </div>
  );
};

export default Header;
