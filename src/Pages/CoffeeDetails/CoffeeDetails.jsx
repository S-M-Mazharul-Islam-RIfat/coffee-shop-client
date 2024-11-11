import { useLoaderData } from "react-router-dom";

const CoffeeDetails = () => {
   const { image, name, chef, price, category, taste, supplier } = useLoaderData();

   return (
      <div className="h-screen w-[90%] md:w-[70%] lg:w-[60%] mx-auto mt-14">
         <div className="card flex-col md:flex-row bg-base-100 shadow-2xl">
            <figure className="pt-6 w-[55%] mx-auto">
               <img
                  src={image}
                  alt="coffee" />
            </figure>
            <div className="card-body">
               <p><span className="text-[1.1rem] font-medium leading-0">Name: </span>{name}</p>
               <p><span className="text-[1.1rem] font-medium">Chef: </span>{chef}</p>
               <p><span className="text-[1.1rem] font-medium">Category: </span>{category}</p>
               <p><span className="text-[1.1rem] font-medium">Taste: </span>{taste}</p>
               <p><span className="text-[1.1rem] font-medium">Supplier: </span>{supplier}</p>
               <p><span className="text-[1.1rem] font-medium">Price: </span>{price}$</p>
            </div>
         </div>
      </div>
   );
};

export default CoffeeDetails;