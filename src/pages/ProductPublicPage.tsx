import Footer from "@/layout/Footer";
import Header from "@/layout/Header";
import { ProductPublicView } from "@/sections/product-public/view";
import { Helmet } from "react-helmet";

const ProductPublicPage = () => {
  return (
    <>
      <Helmet>
        <title> FMilk | Product management </title>
      </Helmet>
      <Header />
      <ProductPublicView />
      <Footer />
    </>
  );
};

export default ProductPublicPage;
