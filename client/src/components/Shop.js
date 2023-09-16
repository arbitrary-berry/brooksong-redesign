import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom";

function Shop() {

// fetch all products

  return (
    <div>
      <NavLink to="/meganbag">
        <button>Megan Bag</button>
      </NavLink>
      <NavLink to="/minibag">
        <button>Mini Bag</button>
      </NavLink>
      <NavLink to="/christaclutch">
        <button>Christa Clutch</button>
      </NavLink>
      <NavLink to="/passportcover">
        <button>Passport Cover</button>
      </NavLink>      
      <NavLink to="/miasnapwallet">
        <button>Mia Snap Wallet</button>
      </NavLink>      
      <NavLink to="/bigtasselkeychain">
        <button>Big Tassel Keychain</button>
      </NavLink>      
      <NavLink to="/minitasselkeychain">
        <button>Mini Tassel Keychain</button>
      </NavLink>      
    </div>
  );
}

export default Shop;