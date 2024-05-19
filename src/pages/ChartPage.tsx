import React from "react";
import { Helmet } from "react-helmet";
import { ChartView } from "@/sections/dashboard/chart/view";

const ChartPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> FMilk | Chart </title>
      </Helmet>
      <ChartView />
    </>
  );
};

export default ChartPage;
