import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import "./Navbar1.css";

function Navbar1() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo" onClick={closeMobileMenu}>
            {/* <img src="/images/iisc.ico" width="33px" height="30px"/> */}

            <div class="log">
              {/* <p>New Proj</p> */}
              {/* <a class = "iisc" href = "https://iisc.ac.in">IISc</a>
          <a class = "art" href = "https://www.artpark.in">ART</a>
          <img src="/images/finallogo.png" width="200px" height="40px"/>  */}
            </div>
          </div>
          <h1 class="title-proj">Question Corrector</h1>

          {/*           
            <a className='nav' href = "https://vaani.iisc.ac.in">Vaani</a>
            
         */}

          {/* <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div> */}
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            {/* <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
              <div class="dropdown">
   <button class="dropbtn">Home</button>
   <div class="dropdown-content">
    <Link to = '/about'>About</Link>
   <Link to = '/partners'>Partners</Link>
   
 </div>
</div>
              </Link>
            </li> */}{" "}
            <li className="nav-item">
              {/* <Link
                to='/'
                className='nav-links'
                onClick={closeMobileMenu}
              >
              Home
              </Link> */}
            </li>
            {/* </li>
            <li className='nav-item'>
              <Link
                to='/data'
                className='nav-links'
                onClick={closeMobileMenu}
              >
               Data
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/team'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Team
              </Link>
            </li>
            
               <li className='nav-item'>
              <Link
                to='/methodology'
                className='nav-links'
                onClick={closeMobileMenu}
              >
              Methodology
              </Link>
            </li>
            
          
          
            <li className='nav-item'>
              <Link
                to='/media'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Media
              </Link>
           
            </li>
          
            <li className='nav-item'>
              <Link
                to='/contact'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Contact
              </Link>
           
            </li>
         */}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar1;
