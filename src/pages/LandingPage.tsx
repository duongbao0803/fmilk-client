import { HomePageView } from "@/sections/home/view";
import React from "react";
import { Helmet } from "react-helmet";

const LandingPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> FAMS | Home </title>
      </Helmet>
      <HomePageView />
    </>
  );
};

export default LandingPage;