import CoffeeCart from "../../Components/CoffeeCart/CoffeeCart";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import useCoffee from "../../Hooks/useCoffee";

const Menu = () => {
   const [coffee] = useCoffee();

   return (
      <div className="w-[90%] mx-auto">
         <div>
            <SectionTitle heading={"Order Your Coffee"}></SectionTitle>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 mt-10 mb-24">
            {
               coffee.map(singleCoffee => <CoffeeCart key={singleCoffee._id} singleCoffee={singleCoffee}></CoffeeCart>)
            }
         </div>
      </div>
   );
};

export default Menu;