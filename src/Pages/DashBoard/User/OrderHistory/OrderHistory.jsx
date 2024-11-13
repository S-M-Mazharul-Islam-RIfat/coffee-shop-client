import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import useAuth from "../../../../Hooks/useAuth";
import useOrders from "../../../../Hooks/useOrders";
import Loader from "../../../Shared/Loader/Loader";

const OrderHistory = () => {
   const { user } = useAuth();
   const [orders, loading] = useOrders(user?.email);

   return (
      <div>
         <Helmet>
            <title>Dashboard | Order History</title>
         </Helmet>
         <div>
            <SectionTitle heading={'Order History'}></SectionTitle>
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
                           <th>Image</th>
                           <th>Coffee Name</th>
                           <th>Date</th>
                           <th>Time</th>
                           <th>Price</th>
                           <th>Payment</th>
                           <th>Status</th>
                        </tr>
                     </thead>
                     <tbody>
                        {
                           orders.map((coffee, index) =>
                              <tr key={coffee._id} className="hover leading-8">
                                 <td className="text-center">{index + 1}</td>
                                 <td>
                                    <div className="avatar">
                                       <div className="w-10 rounded-full">
                                          <img src={coffee.image} />
                                       </div>
                                    </div>
                                 </td>
                                 <td>{coffee.name}</td>
                                 <td>{coffee.date}</td>
                                 <td>{coffee.time}</td>
                                 <td>{coffee.price}$</td>
                                 <td>
                                    <button
                                       style={{
                                          padding: '0px 12px',
                                          borderRadius: '5px',
                                          backgroundColor: `${coffee.payment == 'pending' ? '#dd9000' : '#16a34a'}`,
                                          border: 'none'
                                       }}
                                       disabled={true}
                                    >{(coffee.payment[0]).toUpperCase()}{(coffee.payment).slice(1, coffee.payment.length)}
                                    </button>
                                 </td>
                                 <td>
                                    <button
                                       style={{
                                          padding: '0px 12px',
                                          borderRadius: '5px',
                                          backgroundColor: `${coffee.status == 'pending' ? '#dd9000' : '#16a34a'}`,
                                          border: 'none'
                                       }}
                                       disabled={true}
                                    >
                                       {
                                          coffee.status === 'pending' ? 'Pending' : 'Coffee is brewing'
                                       }
                                    </button>
                                 </td>
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

export default OrderHistory;