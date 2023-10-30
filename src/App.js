// // import React from 'react';
// // import logo from './logo.svg';
// // import './App.css';
// // import './Form.js'
// // import { BrowserRouter as Router, Switch, Route,Routes } from 'react-router-dom';
// // import Form from './Form.js';
// // import Ques from './Ques.js';

// // function App() {
// //   return (
// //     <div className="App">
// //     <p>
// //       <Form />
     
// // {/*     
// //     <Routes>
// //     <Route exact path='/'  element={<Form/>}/>
// //     <Route exact path='/question' element={<Ques/>} />
// //     </Routes> */}
       
      
    

// //     </p>
// //     </div>
// //   );
// // }

// // export default App;

// import React from "react";
// import {BrowserRouter,Routes,Route} from "react-router-dom";
// import Home from "./Home";
// import About from "./About";
// import Form from "./Form";
// import Login from "./Login";
// import { GoogleOAuthProvider } from '@react-oauth/google';
// import google from './google';
// import Demo from "./Demo";
// import Parent from "./Parent";
// function App() {
    
//   return (
//       <>
  
//       <Routes>
//         <Route exact path="/pg" element={<Form/>}/>
//         <Route exact path="/" element={<Login/>}/>
//         <Route exact path="/about" element={<About/>}/>
//       </Routes>
 
//       </>
//   );
// }
  
// export default App;

import React,{ useState, useEffect } from 'react';

import Login from './Login';
// import Home from './components/HomePage';
import firebase  from './base';
import './App.css';
import Form from './Form';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setUser(user);
    })
  }, [])

  return (
    <div className="app">
      {user ? <Form user={user} /> : <Login/>}
    </div>
  );
}

export default App;