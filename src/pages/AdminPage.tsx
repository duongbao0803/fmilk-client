import React from "react";
import { Helmet } from "react-helmet";
import { AdminView } from "@/sections/dashboard/admin/view";

const AdminPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> FMilk | Admin </title>
      </Helmet>
      <AdminView />
    </>
  );
};

export default AdminPage;
