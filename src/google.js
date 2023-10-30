import React, { useState, useEffect, useContext } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { createSearchParams, Link, useNavigate } from "react-router-dom";
import "./google.css";
import Form from "./Form";
import firebase from "./firebase";
import {
  getDatabase,
  ref,
  child,
  get,
  update,
  set,
  push,
} from "firebase/database";
import "firebase/compat/database";

function google(props) {
  const UserContext = React.createContext();
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const [name, setName] = useState([]);
  const navigate = useNavigate();
  let name1 = "Hi2";

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);
  useEffect(() => {
    setName(profile.name);
    localStorage.setItem("Name", profile.name);
    sessionStorage.setItem("Name1", profile.name);
    name1 = profile.name;
  });
  console.log(name);
  const writefile = () => {
    const fs = require("fs");
    const data = "This is the new content of the file.";
    fs.writeFile("file.txt", data, (err) => {
      if (err) {
        throw err;
        console.log("Data has been written to file successfully.");
      }
    });
  };
  const updateData = async () => {
    const db = getDatabase();
    const updates = {};
    if (name1 != "") {
      updates["data/" + "users/" + "name/"] = "Keerthana";

      update(ref(db), updates);
    }
  };

  let username = profile.name;
  let h = username;

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
      updateData();
    },
    onError: (error) => console.log("Login Failed:", error),
  });
  const mainlogin = () => {
    login();

    navigate("/pg");
  };

  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  return (
    <div>
      <h2>English Gyani App Plagiarism Corrector</h2>
      <br />
      <br />
      <button
        className="loginbtn"
        onClick={() => {
          mainlogin();
        }}
      >
        Sign In{" "}
      </button>
      <div className="profilename"></div>
    </div>
  );
}
export default google;
