import { useLoaderData } from "react-router-dom";

const CoffeeDetails = () => {
   const { image, name, chef, price, category, taste, supplier } = useLoaderData();

   return (
      <div className="h-screen w-[90%] md:w-[70%] lg:w-[55%] mx-auto mt-14">
         <div className="card flex flex-col md:flex-row bg-base-100 shadow-2xl">
            <div className="p-8 w-full md:w-1/2 flex justify-center items-center">
               <img className="mx-auto" src={image} alt="coffee" />
            </div>
            <div className="card-body w-full md:w-1/2">
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