import About from "../About/About";
import CoffeeGallery from "../CoffeeGallery/CoffeeGallery";
import Banner from "../Banner/Banner";

const Home = () => {


   return (
      <>
         {/* <div
            className="hero min-h-screen"
            style={{
               backgroundImage: "url(https://i.ibb.co.com/J2SgHFP/Coffee-Cover.png)",
            }}>
            <div className="hero-content text-neutral-content text-center">
               <div className="max-w-[40rem]">
                  <h1 className="mb-5 text-5xl font-bold">Would you like a Cup of Delicious Coffee?</h1>
                  <p className="mb-5">
                     Its coffee time - Sip & Savor - Relaxation in every sip! Get the nostalgia back!! Your companion of every moment!!! Enjoy the beautiful moments and make them memorable.
                  </p>
                  <Link to={'/menu'} className="btn bg-white border-0">Order Coffee</Link>
               </div>
            </div>
         </div> */}
         <Banner></Banner>
         <About></About>
         <CoffeeGallery></CoffeeGallery>
      </>
   );
};

export default Home;