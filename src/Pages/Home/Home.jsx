import About from "../About/About";
import CoffeeGallery from "../CoffeeGallery/CoffeeGallery";
import Banner from "../Banner/Banner";
import { Helmet } from "react-helmet-async";

const Home = () => {

   return (
      <>
         <Helmet>
            <title>Home</title>
         </Helmet>
         <Banner></Banner>
         <About></About>
         <CoffeeGallery></CoffeeGallery>
      </>
   );
};

export default Home;