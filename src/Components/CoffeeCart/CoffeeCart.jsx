import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAdmin from "../../Hooks/useAdmin";

const CoffeeCart = ({ singleCoffee }) => {
   const { _id, image, name, chef, price } = singleCoffee;
   const { user } = useAuth();
   const navigate = useNavigate();
   const location = useLocation();
   const axiosSecure = useAxiosSecure();
   const [isAdmin] = useAdmin();
   const fullDateAndTime = new Date();
   const date = `${fullDateAndTime.getDate()}-${fullDateAndTime.getMonth()}-${fullDateAndTime.getFullYear()}`
   const time = `${fullDateAndTime.getHours()}:${(fullDateAndTime.getMinutes() >= 0 && fullDateAndTime.getMinutes() <= 9) ? '0' + fullDateAndTime.getMinutes() : fullDateAndTime.getMinutes()}:${(fullDateAndTime.getSeconds() >= 0 && fullDateAndTime.getSeconds() <= 9) ? '0' + fullDateAndTime.getSeconds() : fullDateAndTime.getSeconds()}`;

   const handleAddToCart = async () => {
      if (user) {
         const userDetails = await axiosSecure.get(`/allUsers/${user.email}`);
         const orderedItem = {
            coffeeId: _id,
            email: user.email,
            userName: userDetails.data.name,
            name,
            image,
            price: parseFloat(price),
            date: date,
            time: time,
            status: 'pending',
            payment: 'pending'
         }
         const orderRes = await axiosSecure.post('/orders', orderedItem)
         const cartRes = await axiosSecure.post('/cart', orderedItem)
         if (orderRes.data.insertedId && cartRes.data.insertedId) {
            Swal.fire({
               position: "top-end",
               icon: "success",
               title: `${name} added to your cart`,
               showConfirmButton: false,
               timer: 1500
            });

         }
      }
      else {
         Swal.fire({
            title: "You are not logged in",
            text: "Please login to add to the cart?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, login!"
         }).then((result) => {
            if (result.isConfirmed) {
               navigate('/login', { state: { from: location } })
            }
         });
      }
   }

   return (
      <div className="card bg-[#F5F4F1] w-96 shadow-2xl mx-auto">
         <figure className="pt-5">
            <img
               src={image}
               alt="coffee"
               className="rounded-xl" />
         </figure>
         <div className="card-body items-center text-center pt-2">
            <h2><span className="text-[1.1rem] font-medium">Name: </span>{name}</h2>
            <p><span className="text-[1.1rem] font-medium">Chef: </span>{chef}</p>
            <p><span className="text-[1.1rem] font-medium">Price: </span>{price}$</p>
            <div className="card-actions gap-5 flex pt-3">
               <Link to={`/coffee/${_id}`}><button className="btn btn-outline">View Details</button></Link>
               <button disabled={isAdmin} onClick={handleAddToCart} className="btn btn-outline">Order Now</button>
            </div>
         </div>
      </div>
   );
};

export default CoffeeCart;