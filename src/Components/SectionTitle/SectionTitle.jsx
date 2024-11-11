
const SectionTitle = ({ heading }) => {
   return (
      <div className="w-[55%] md:w-[35%] lg:w-[27%]  mx-auto text-center my-4">
         <h2
            className="text-[#331A15] text-[1.3rem] md:text-[1.6rem] lg:text-[1.8rem] uppercase font-medium border-y-4 py-4"
            style={{
               textShadow: "1px 1px 5px rgba(255, 255, 255, 0.9)"
            }}
         >
            {heading}
         </h2>
      </div>
   );
};

export default SectionTitle;