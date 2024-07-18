import Footer from "@/layout/Footer";
import Header from "@/layout/Header";
import { PostPublicView } from "@/sections/post-public/view";
import { Helmet } from "react-helmet";

const PostPublicPage = () => {
  return (
    <>
      <Helmet>
        <title> FMilk | Product management </title>
      </Helmet>
      <Header />
      <PostPublicView />
      <Footer />
    </>
  );
};

export default PostPublicPage;
