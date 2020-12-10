import React, { useEffect, useState } from "react";
import Row from "./Row";
import Nav from "./Nav";
import Banner from "./Banner";
import Profiles from "./Profiles";
import Loading from "./Loading";
import { LoadingReleaseBody } from "./Loading";
import requests from "./requests";
import { auth } from "./firebase";

function Rows() {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser || {};
  useEffect(() => {
    console.log("user", profile);
    setTimeout(() => {
      setLoading(false);
    }, 3000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile.displayName]);
  const avatar =
    "https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png";

  return profile.displayName ? (
    <>
      {loading ? <Loading src={avatar} /> : <LoadingReleaseBody />}
      <Nav />
      <Banner />
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title="TRENDING NOW" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
    </>
  ) : (
    <Profiles src={avatar} user={user} setProfile={setProfile} />
  );
}

export default Rows;
