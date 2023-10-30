import {
  signInWithGoogle,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
} from "./base";
import React, { useState } from "react";
import "./Login.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  return (
    <div>
      <div>
        <h3>English Gyani Correction Corrector</h3>
        <button
          className="sign"
          variant="outline-primary"
          onClick={signInWithGoogle}
        >
          {" "}
          <img class="imgbtn" src={require("./btng.png")} height="42" />
          Sign-in
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
