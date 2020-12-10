import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase";
import axios from "./axios";
import requests from "./requests";
import "./SignIn.css";

function SignIn() {
  const history = useHistory();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [movie, setMovie] = useState([]);

  const isInvalid = password === "" || emailAddress === "";

  const handleSignin = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(emailAddress, password)
      .then(() => {
        history.push("/rows");
      })
      .catch((error) => {
        setEmailAddress("");
        setPassword("");
        setError(error.message);
      });
  };

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      console.log(request.data.results);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length)
        ]
      );
      return request;
    }

    fetchData();
  }, []);
  console.log(movie);

  return (
    <>
      <div
        className="background"
        style={{
          background: `linear-gradient( rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.7) ), url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}") top left / cover no-repeat`,
        }}
      >
        <header>
          <img
            class="form_logo"
            src="https://raw.githubusercontent.com/karlhadwen/netflix/master/src/logo.svg"
            alt="Netflix Logo"
          />
        </header>
        <div className="form_cover">
          <h1 className="form_title">Sign In</h1>
          {error && <div className="error_warnings">{error}</div>}
          <form className="form" onSubmit={handleSignin} form="POST">
            <input
              className="form_input"
              type="email"
              placeholder="Email address"
              value={emailAddress}
              onChange={({ target }) => setEmailAddress(target.value)}
            />

            <input
              className="form_input"
              type="password"
              placeholder="Password"
              required
              autoComplete="off"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />

            <button className="form_button" disabled={isInvalid} type="submit">
              Sign In
            </button>
          </form>
          <p className="form_text">
            New to Netflix? <Link className="sign" to="/signup">Sign up now</Link>
          </p>
          <p className="form_smallText">
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. Learn more
          </p>
        </div>
        
      </div>
    </>
  );
}

export default SignIn;
