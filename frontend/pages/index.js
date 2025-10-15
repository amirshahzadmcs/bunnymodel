import React from "react";
import ModelHome from "../src/components/app/HomeComponent/ModelHome";
import CookiePopup from "../src/components/app/CookiePopup";
import AgeVerifyPopup from "../src/components/app/PopupComponent/AgeVerifyPopup";
const HomePage = () => {
  return (
    <>
      <ModelHome />
      <CookiePopup/>
      <AgeVerifyPopup/>
    </>
  );
};

export default HomePage;
