import { useEffect, useState } from "react";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import Loader from "../../../Shared/Loader/Loader";

const PaymentHistory = () => {
   const { user } = useAuth();
   const [payments, setPayments] = useState([]);
   const [loading, setLoading] = useState(true);
   const axiosSecure = useAxiosSecure();

   useEffect(() => {
      axiosSecure.get(`/payments/${user?.email}`)
         .then(res => {
            setPayments(res.data);
            setLoading(false);
         })
   }, [axiosSecure, user?.email])

   return (
      <div>
         <div>
            <SectionTitle heading={"Payment History"}></SectionTitle>
         </div>
         {
            loading ?
               <Loader></Loader>
               :
               <div className="w-full md:w-[85%] mx-auto mt-8">
                  <table className="table bg-zinc-300 rounded-lg mt-8">
                     <thead>
                        <tr className="leading-8 bg-zinc-500 text-white">
                           <th>#</th>
                           <th>User Email</th>
                           <th>Total Coffee</th>
                           <th>Date</th>
                           <th>Time</th>
                           <th>Price</th>
                           <th>Transaction Id</th>
                        </tr>
                     </thead>
                     <tbody>
                        {
                           payments.map((payment, index) =>
                              <tr key={payment._id} className="hover leading-8">
                                 <td>{index + 1}</td>
                                 <td>{payment.email}</td>
                                 <td>{payment.cartIds.length}</td>
                                 <td>{payment.date}</td>
                                 <td>{payment.time} {payment.time[1] == ':' ? 'AM' : 'PM'}</td>
                                 <td>{payment.price}$</td>
                                 <td>{payment.transactionId}</td>
                              </tr>
                           )
                        }
                     </tbody>
                  </table>
               </div>
         }
      </div>
   );
};

export default PaymentHistory;