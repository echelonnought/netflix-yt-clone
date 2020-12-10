import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase";
import axios from "./axios";
import requests from "./requests";
import './SignIn.css';

function SignUp() {
  const history = useHistory();

  const [firstName, setFirstName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [movie, setMovie] = useState([]);

  const isInvalid = firstName === "" || password === "" || emailAddress === "";

  const handleSignup = (event) => {
    event.preventDefault();

    auth
      .createUserWithEmailAndPassword(emailAddress, password)
      .then((result) => {
        result.user
          .updateProfile({
            displayName: firstName,
          })
          .then(() => history.push("/rows"));
      })
      .catch((error) => {
        setFirstName("");
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
        <h1 className="form_title">Sign Up</h1>
        {error && <div className="error_warnings">{error}</div>}
        <form className="form" onSubmit={handleSignup} form="POST">
          <input
            className="form_input"
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={({ target }) => setFirstName(target.value)}
          />
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
            Sign Up
          </button>
        </form>
        <p className="form_text">
          Already a user? <Link className="sign" to="/">Sign in now</Link>
        </p>
        <p className="form_smallText">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.
          Learn more
        </p>
      </div>
    </div>
    </>
  );
}

export default SignUp;
