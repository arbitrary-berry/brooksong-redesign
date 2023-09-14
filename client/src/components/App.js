import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
// import { useCustomerAuth } from "../context/CustomerAuthProvider";
import Home from './Home';
import Profile from './Profile';
import Shop from './Shop';
import Leather from './Leather';
import Story from "./Story";
import Donation from "./Donation";
import FAQs from "./FAQs";
import MeganBag from "./MeganBag";
import MiniBag from "./MiniBag";
import ChristaClutch from "./ChristaClutch";
import PassportCover from "./PassportCover";
import MiaSnapWallet from "./MiaSnapWallet";
import BigTasselKeychain from "./BigTasselKeychain";
import MiniTasselKeychain from "./MiniTasselKeychain";
import Cart from "./Cart";
import About from "./About"


function App() {
  // const {checkAuthorized} = useCustomerAuth();

  // useEffect(() => {
  //   checkAuthorized();
  // }, [])

  return (
  <div>
    <Home />
      <Switch>
        <Route path="/customer/:id" ><Profile /></Route>
        <Route path="/about"><About /></Route>
        <Route path="/shop" ><Shop /></Route>         
        <Route path="/leather" ><Leather /></Route>        
        <Route path="/story" ><Story /></Route>
        <Route path="/donation"><Donation /></Route>
        <Route path="/faqs"><FAQs /></Route>
        <Route path="/meganbag"><MeganBag /></Route>
        <Route path="/minibag"><MiniBag /></Route>
        <Route path="/christaclutch"><ChristaClutch /></Route>
        <Route path="/passportcover"><PassportCover /></Route>
        <Route path="/miasnapwallet"><MiaSnapWallet /></Route>
        <Route path="/bigtasselkeychain"><BigTasselKeychain /></Route>
        <Route path="/miniTasselkeychain"><MiniTasselKeychain /></Route>
        <Route path="/cart"><Cart /></Route>
        <Route path="/"><Home /></Route>
      </Switch>
      </div>
  )
}

export default App;






