import React from "react";
import './Profiles.css';

function Profiles({ src, user, setProfile }) {
  
  return (
    <div className="profiles_background">
      <header>
        <img
          className="profile_logo"
          src="https://raw.githubusercontent.com/karlhadwen/netflix/master/src/logo.svg"
          alt="Netflix Logo"
        />
      </header>
      <div className="profiles">
        <h1 className="title">Who's watching?</h1>
        <ul
          className="list"
          onClick={() => setProfile({ displayName: user.displayName })}
        >
          <li className="item">
            <img
              className="picture"
              src={src ? src : `/images/misc/loading.gif`}
              alt=""
            />
            <p className="name">{user.displayName}</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Profiles;
