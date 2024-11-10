
const About = () => {
   return (
      <div
         className=""
         style={{
            backgroundImage: "url(https://i.ibb.co.com/x2YFvpz/About-Bg.png)",
         }}>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-[80%] mx-auto py-8">
            <div className="card w-46">
               <figure className="px-10 pt-10">
                  <img
                     src="https://i.ibb.co.com/GHBy3Lt/1.png"
                     alt="Shoes"
                     className="rounded-xl" />
               </figure>
               <div className="card-body items-center text-center">
                  <h2 className="card-title">Awesome Aroma</h2>
                  <p>You will definitely be a fan of the design & aroma of your coffee</p>
               </div>
            </div>
            <div className="card w-46">
               <figure className="px-10 pt-10">
                  <img
                     src="https://i.ibb.co.com/5Kj0kTx/2.png"
                     alt="Shoes"
                     className="rounded-xl" />
               </figure>
               <div className="card-body items-center text-center">
                  <h2 className="card-title">High Quality</h2>
                  <p>We served the coffee to you maintaining the best quality</p>
               </div>
            </div>
            <div className="card w-46">
               <figure className="px-10 pt-10">
                  <img
                     src="https://i.ibb.co.com/myTb1fc/3.png"
                     alt="Shoes"
                     className="rounded-xl" />
               </figure>
               <div className="card-body items-center text-center">
                  <h2 className="card-title">Pure Grades</h2>
                  <p>The coffee is made of the green coffee beans which you will love</p>
               </div>
            </div>
            <div className="card w-46">
               <figure className="px-10 pt-10">
                  <img
                     src="https://i.ibb.co.com/D8c2gfN/4.png"
                     alt="Shoes"
                     className="rounded-xl" />
               </figure>
               <div className="card-body items-center text-center">
                  <h2 className="card-title">Proper Roasting</h2>
                  <p>Your coffee is brewed by first roasting the green coffee beans</p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default About;