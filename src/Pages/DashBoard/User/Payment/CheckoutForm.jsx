import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from './../../../../Hooks/useAxiosSecure';
import useAuth from "../../../../Hooks/useAuth";
import useCart from "../../../../Hooks/useCart";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useOrders from "../../../../Hooks/useOrders";

const CheckoutForm = () => {
   const { user } = useAuth();
   const [error, setError] = useState('');
   const [transactionId, setTransactionId] = useState('');
   const [clientSecret, setClientSecret] = useState('');
   const stripe = useStripe();
   const elements = useElements();
   const axiosSecure = useAxiosSecure();
   const [cart, , refetch] = useCart(user?.email);
   const [orders] = useOrders(user?.email)
   const navigate = useNavigate();
   const totalPrice = cart.reduce((sum, coffee) => sum + (coffee.price), 0);
   const fullDateAndTime = new Date();
   const date = `${fullDateAndTime.getDate()}-${fullDateAndTime.getMonth()}-${fullDateAndTime.getFullYear()}`
   const time = `${fullDateAndTime.getHours()}:${(fullDateAndTime.getMinutes() >= 0 && fullDateAndTime.getMinutes() <= 9) ? '0' + fullDateAndTime.getMinutes() : fullDateAndTime.getMinutes()}:${(fullDateAndTime.getSeconds() >= 0 && fullDateAndTime.getSeconds() <= 9) ? '0' + fullDateAndTime.getSeconds() : fullDateAndTime.getSeconds()}`;

   useEffect(() => {
      if (totalPrice) {
         axiosSecure.post('/create-payment-intent', { price: totalPrice })
            .then(res => {
               setClientSecret(res.data.clientSecret);
            })
      }
   }, [axiosSecure, totalPrice])


   const handleSubmit = async (event) => {
      event.preventDefault();

      if (!stripe || !elements) {
         return;
      }

      const card = elements.getElement(CardElement);
      if (card == null) {
         return;
      }

      const { error, paymentMethod } = await stripe.createPaymentMethod({
         type: 'card',
         card
      })

      if (error) {
         setError(error.message);
      }
      else {
         setError('');
      }

      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
         payment_method: {
            card: card,
            billing_details: {
               email: user?.email || 'anonymous',
            }
         }
      })

      if (confirmError) {
         //  
      }
      else {
         if (paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id);
            const pendingPaymentCoffees = orders.filter(coffee => coffee.payment === 'pending')
            const payment = {
               email: user.email,
               price: totalPrice,
               transactionId: paymentIntent.id,
               date: date,
               time: time,
               cartIds: cart.map(coffee => coffee._id),
               coffeIds: cart.map(coffee => coffee.coffeeId),
               pendingPaymentCoffeIds: pendingPaymentCoffees.map(coffee => coffee._id)
            }

            const res = await axiosSecure.post('/payments', payment);
            refetch();
            if (res.data?.paymentResult?.insertedId) {
               Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Thank you for the taka paisa",
                  showConfirmButton: false,
                  timer: 1500
               });
               navigate('/dashboard/paymentHistory')
            }

         }
      }
   }

   return (
      <div className="w-[80%] mx-auto mt-16">
         <form onClick={handleSubmit}>
            <CardElement
               options={{
                  style: {
                     base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                           color: '#aab7c4',
                        },
                     },
                     invalid: {
                        color: '#9e2146',
                     },
                  },
               }}
            />
            <button className="btn btn-sm btn-primary my-4" type="submit" disabled={!stripe || !clientSecret}>
               Pay
            </button>
            <p className="text-red-600">{error}</p>
         </form>
      </div>
   );
};

export default CheckoutForm;