import { Link } from "react-router-dom";

const CoffeeGallery = () => {
   return (
      <div className="mt-12">
         <div className="md:w-[30%] mx-auto text-center my-4">
            <h2
               className="text-[#331A15] text-3xl uppercase font-medium  py-4"
               style={{
                  textShadow: "1px 1px 5px rgba(255, 255, 255, 0.9)"
               }}
            >
               Coffee Gallery
            </h2>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-10 mt-16 mb-10">
            <div className="card w-96 mx-auto">
               <figure>
                  <img
                     src="https://i.ibb.co.com/tmddTG8/cup1.png"
                     alt="coffee1" />
               </figure>
            </div>
            <div className="card w-96 mx-auto">
               <figure>
                  <img
                     src="https://i.ibb.co.com/TmFVF8k/cup2.png"
                     alt="coffee2" />
               </figure>
            </div>
            <div className="card w-96 mx-auto">
               <figure>
                  <img
                     src="https://i.ibb.co.com/jDp9M9D/cup3.png"
                     alt="coffee3" />
               </figure>
            </div>
            <div className="card w-96 mx-auto">
               <figure>
                  <img
                     src="https://i.ibb.co.com/t8pBkm7/cup4.png"
                     alt="coffee4" />
               </figure>
            </div>
            <div className="card w-96 mx-auto">
               <figure>
                  <img
                     src="https://i.ibb.co.com/hHgDxfy/cup5.png"
                     alt="coffee5" />
               </figure>
            </div>
            <div className="card w-96 mx-auto">
               <figure>
                  <img
                     src="https://i.ibb.co.com/cFbwSF0/cup6.png"
                     alt="coffee6" />
               </figure>
            </div>
            <div className="card w-96 mx-auto">
               <figure>
                  <img
                     src="https://i.ibb.co.com/KmjGYKq/cup7.png"
                     alt="coffee7" />
               </figure>
            </div>
            <div className="card w-96 mx-auto">
               <figure>
                  <img
                     src="https://i.ibb.co.com/MVpPy8C/cup8.png"
                     alt="coffee8" />
               </figure>
            </div>
         </div>
         <div className="text-center mb-8">
            <Link to={'/menu'}>
               <button className="btn btn-outline mt-5">Order Coffee Now</button>
            </Link>
         </div>
      </div>
   );
};

export default CoffeeGallery;