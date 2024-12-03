import { Helmet } from "react-helmet-async";
import CoffeeCart from "../../Components/CoffeeCart/CoffeeCart";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import useCoffee from "../../Hooks/useCoffee";
import Loader from "../Shared/Loader/Loader";

const Menu = () => {
   const [coffee, loading] = useCoffee();

   return (
      <div className="mb-24 w-[90%] mx-auto">
         <Helmet>
            <title>Menu</title>
         </Helmet>
         <div>
            <SectionTitle heading={"Order Your Coffee"}></SectionTitle>
         </div>
         {
            loading ?
               <Loader></Loader>
               :
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-14 overflow-hidden">
                  {
                     coffee.map(singleCoffee => <CoffeeCart key={singleCoffee._id} singleCoffee={singleCoffee}></CoffeeCart>)
                  }
               </div>
         }
      </div>
   );
};

export default Menu;