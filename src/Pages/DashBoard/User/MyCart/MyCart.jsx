import Swal from "sweetalert2";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import { Link } from "react-router-dom";
import useCart from "../../../../Hooks/useCart";
import Loader from "../../../Shared/Loader/Loader";

const MyCart = () => {
   const { user } = useAuth();
   const [cart, loading, refetch] = useCart(user?.email);
   const axiosSecure = useAxiosSecure();

   const handleDelete = coffee => {
      Swal.fire({
         title: "Are you sure?",
         text: "You won't be able to revert this!",
         icon: "warning",
         showCancelButton: true,
         confirmButtonColor: "#3085d6",
         cancelButtonColor: "#d33",
         confirmButtonText: "Yes, delete it!"
      }).then(async (result) => {
         if (result.isConfirmed) {
            const orderRes = await axiosSecure.delete(`/orders/${coffee.coffeeId}`);
            const coffeeRes = await axiosSecure.delete(`/cart/${coffee._id}`);
            if (orderRes.data.deletedCount && coffeeRes.data.deletedCount) {
               refetch();
               Swal.fire({
                  title: "Deleted!",
                  text: `${coffee.name} has been deleted`,
                  icon: "success"
               });
            }
         }
      });
   }

   return (
      <div>
         <div>
            <SectionTitle heading={"My Cart"}></SectionTitle>
         </div>
         {
            cart.length >= 1 ?
               <>
                  <div className="flex w-full md:w-[85%] lg:w-[85%] mx-auto justify-between text-[1.2rem] md:[text-1.3rem] lg:text-[1.5rem] pt-6">
                     <div>Orders : {cart.length}</div>
                     <div>Total Price : {cart.reduce((sum, coffee) => sum + (parseInt(coffee.price)), 0)}$</div>
                     <div>
                        <Link to='/dashboard/payment'><button className="btn btn-sm btn-outline">Pay</button></Link>
                     </div>
                  </div>
                  {
                     loading ?
                        <Loader></Loader>
                        :
                        <div className="w-full md:w-[85%] mx-auto mt-8">
                           <table className="table bg-zinc-300 rounded-lg">
                              <thead>
                                 <tr className="leading-8 bg-zinc-500 text-white">
                                    <th>#</th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Action</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 {
                                    cart.map((coffee, index) =>
                                       <tr key={coffee._id} className="hover leading-8">
                                          <td className="text-center">{index + 1}</td>
                                          <td>
                                             <div className="avatar">
                                                <div className="w-10 rounded-full">
                                                   <img src={coffee.image} />
                                                </div>
                                             </div>
                                          </td>
                                          <td className="text-nowrap">{coffee.name}</td>
                                          <td>{coffee.price}$</td>
                                          <td>{coffee.date}</td>
                                          <td>{coffee.time} {coffee.time[1] == ':' ? 'AM' : 'PM'}</td>
                                          <td><button onClick={() => handleDelete(coffee)} className="custom-delete-btn text-white">Delete</button></td>
                                       </tr>
                                    )
                                 }
                              </tbody>
                           </table>
                        </div>
                  }
               </>
               :
               <div className="text-center pt-6">
                  <p className="text-2xl">Your cart is empty!!!</p>
                  <Link to={'/menu'}>
                     <button className="btn btn-outline mt-5">Order Coffee Now</button>
                  </Link>
               </div>
         }
      </div>
   );
};

export default MyCart;