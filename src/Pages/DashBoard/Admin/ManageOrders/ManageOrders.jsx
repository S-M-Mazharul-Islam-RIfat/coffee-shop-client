import Swal from "sweetalert2";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useOrders from "../../../../Hooks/useOrders";
import { Helmet } from "react-helmet-async";

const ManageOrders = () => {
   const [orders, , refetch] = useOrders();
   const axiosSecure = useAxiosSecure();

   const handleStatus = async (coffee) => {
      const res = await axiosSecure.patch(`/orders/${coffee._id}`);
      if (res.data.modifiedCount) {
         refetch();
         Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Status updated successfully",
            showConfirmButton: false,
            timer: 1500
         });
      }
   }

   return (
      <div>
         <Helmet>
            <title>Dashboard | Manage Orders</title>
         </Helmet>
         <div>
            <SectionTitle heading={"Manage Orders"}></SectionTitle>
         </div>
         <div className="w-full md:w-[85%] mx-auto mt-8">
            <table className="table bg-zinc-300 rounded-lg mt-8">
               <thead>
                  <tr className="leading-8 bg-zinc-500 text-white">
                     <th>#</th>
                     <th>Coffee Image</th>
                     <th>Coffee Name</th>
                     <th>User Email</th>
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
                           <td className="text-nowrap">{coffee.email}</td>
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
                              >
                                 {(coffee.payment[0]).toUpperCase()}{(coffee.payment).slice(1, coffee.payment.length)}</button>
                           </td>
                           <td>
                              <button
                                 onClick={() => handleStatus(coffee)}
                                 style={{
                                    padding: '0px 12px',
                                    borderRadius: '5px',
                                    backgroundColor: `${coffee.status == 'pending' ? '#dd9000' : '#16a34a'}`,
                                    border: 'none'
                                 }}
                                 disabled={coffee.payment == 'pending' ? true : false}
                              >
                                 {(coffee.status[0]).toUpperCase()}{(coffee.status).slice(1, coffee.status.length)}
                              </button>
                           </td>
                        </tr>
                     )
                  }
               </tbody>
            </table>
         </div>
      </div >
   );
};

export default ManageOrders;