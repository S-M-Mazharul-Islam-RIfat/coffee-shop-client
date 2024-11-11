import { Link } from "react-router-dom";
import './ManageCoffee.css';
import Swal from "sweetalert2";
import useCoffee from "../../../../Hooks/useCoffee";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";


const ManageCoffee = () => {
   const [coffee, , refetch] = useCoffee();
   const axiosSecure = useAxiosSecure();

   const handleDelete = singleCoffee => {
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
            const res = await axiosSecure.delete(`/coffee/${singleCoffee._id}`);
            if (res.data.deletedCount) {
               refetch();
               Swal.fire({
                  title: "Deleted!",
                  text: `${singleCoffee.name} has been deleted`,
                  icon: "success"
               });
            }
         }
      });
   }

   return (
      <div>
         <div>
            <SectionTitle heading={"Manage Coffee"}></SectionTitle>
         </div>
         <div className="w-full md:w-[85%] mx-auto mt-8">
            <table className="table bg-zinc-300 rounded-lg">
               <thead>
                  <tr className="leading-8 bg-zinc-500 text-white">
                     <th>#</th>
                     <th>Image</th>
                     <th>Name</th>
                     <th>Chef</th>
                     <th>Supplier</th>
                     <th>Category</th>
                     <th>Price</th>
                     <th>Action</th>
                     <th>Action</th>
                  </tr>
               </thead>
               <tbody>
                  {
                     coffee.map((singleCoffee, index) =>
                        <tr key={singleCoffee._id} className="hover leading-8">
                           <td className="text-center">{index + 1}</td>
                           <td>
                              <div className="avatar">
                                 <div className="w-10 rounded-full">
                                    <img src={singleCoffee.image} />
                                 </div>
                              </div>
                           </td>
                           <td className="text-nowrap">{singleCoffee.name}</td>
                           <td>{singleCoffee.chef}</td>
                           <td>{singleCoffee.supplier}</td>
                           <td>{singleCoffee.category}</td>
                           <td>{singleCoffee.price}$</td>
                           <td>
                              <Link to={`/dashboard/updateCoffee/${singleCoffee._id}`}>
                                 <button className="custom-update-btn text-white">Update</button>
                              </Link>
                           </td>
                           <td><button onClick={() => handleDelete(singleCoffee)} className="custom-delete-btn text-white">Delete</button></td>
                        </tr>
                     )
                  }
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default ManageCoffee;