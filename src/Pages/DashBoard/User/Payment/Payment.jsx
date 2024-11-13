import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Helmet } from "react-helmet-async";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
   return (
      <div className="w-full md:w-[95%] mx-auto mt-8">
         <Helmet>
            <title>Dashboard | Payment</title>
         </Helmet>
         <div>
            <SectionTitle heading={"Payment"}></SectionTitle>
         </div>
         <div>
            <Elements stripe={stripePromise}>
               <CheckoutForm></CheckoutForm>
            </Elements>
         </div>
      </div>
   );
};

export default Payment;