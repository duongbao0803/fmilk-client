import { PostManagementView } from "@/sections/post/view";
import React from "react";
import { Helmet } from "react-helmet";

const PostMangementPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> FMilk | Post management </title>
      </Helmet>
      <PostManagementView />
    </>
  );
};

export default PostMangementPage;
