import React, { useEffect, useState } from "react";
import "./Nav.css";
import { auth } from "./firebase";

function Nav() {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className={`nav ${show && "nav_show"}`}>
      <div>
        <img
          class="nav_logo"
          src="https://raw.githubusercontent.com/karlhadwen/netflix/master/src/logo.svg"
          alt="Netflix Logo"
        />
      </div>
      <div className="avatar_log">
        <img
          class="nav_avatar"
          src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
          alt="Netflix Logo"
        />
        <p className="sign_outTag" onClick={() => auth.signOut()}>
          Sign out
        </p>
      </div>
    </div>
  );
}

export default Nav;
