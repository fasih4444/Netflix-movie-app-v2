import React, { useEffect, useState } from 'react';
import './Nav.css';
import './Movie.css';
import { Link } from 'react-router-dom';




function Nav() {
    const [show, handleShow] = useState(false);

   useEffect(() => {
       window.addEventListener("scroll", () => {
           if(window.scrollY > 100) {
               handleShow(true);
           }else handleShow(false);
       });
       return () => {
           window.removeEventListener("scroll");
       };
   }, []);

    return (
        <div className={`nav ${show && "nav__black"}`}>
        <Link to="/" className="nav__logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/799px-Netflix_2015_logo.svg.png" alt="" className="nav__logo"/> 
        </Link>

        <Link to="/search" className="nav__btn">Search movies</Link>
       
        </div>
    )
}

export default Nav;
