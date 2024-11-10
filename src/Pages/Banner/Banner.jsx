import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const Banner = () => {
   return (
      <Carousel>
         <div>
            <img src="https://i.ibb.co.com/2NmKV7H/1.jpg" />
         </div>
         <div>
            <img src="https://i.ibb.co.com/2cwNXM7/2.jpg" />
         </div>
         <div>
            <img src="https://i.ibb.co.com/0D90KSm/3.jpg" />
         </div>
         <div>
            <img src="https://i.ibb.co.com/NrkswBc/4.jpg" />
         </div>
         <div>
            <img src="https://i.ibb.co.com/4NW4Jkv/5.jpg" />
         </div>
      </Carousel>
   );
};

export default Banner;