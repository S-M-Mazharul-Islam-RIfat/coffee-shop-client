import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddCoffee = () => {
   const axiosSecure = useAxiosSecure();

   const {
      register,
      handleSubmit,
      reset
   } = useForm();

   const onSubmit = async (data) => {
      const imageFile = { image: data.image[0] };
      const res = await axiosSecure.post(image_hosting_api, imageFile, {
         headers: {
            'content-type': 'multipart/form-data'
         }
      })
      console.log(res);
      if (res.data.success) {
         const newCoffee = {
            name: data.name,
            chef: data.chef,
            supplier: data.supplier,
            taste: data.taste,
            category: data.category,
            price: data.price,
            image: res.data.data.display_url
         }
         console.log(newCoffee);
         const coffeeRes = await axiosSecure.post('/coffee', newCoffee);
         console.log(coffeeRes.data);
         if (coffeeRes.data.insertedId) {
            Swal.fire({
               position: "center",
               icon: "success",
               title: "Coffee Added Successfully",
               showConfirmButton: false,
               timer: 1500
            });
            reset();
         }
      }
   }
   return (
      <div>
         <div>
            <SectionTitle heading={"Add Coffee"}></SectionTitle>
         </div>

         <div className="w-full md:w-[80%] mx-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
               <div className="form-control w-full mt-6">
                  <label className="label">
                     <span className="label-text text-[#000000] font-semibold">*Name</span>
                  </label>
                  <input type="text" {...register("name", { required: true })} placeholder="Name" className="input input-bordered w-full" />
               </div>
               <div className="form-control w-full mt-6">
                  <label className="label">
                     <span className="label-text text-[#000000] font-semibold">*Chef</span>
                  </label>
                  <input type="text" {...register("chef", { required: true })} placeholder="Chef" className="input input-bordered w-full" />
               </div>
               <div className="form-control w-full mt-6">
                  <label className="label">
                     <span className="label-text text-[#000000] font-semibold">*Supplier</span>
                  </label>
                  <input type="text" {...register("supplier", { required: true })} placeholder="Supplier" className="input input-bordered w-full" />
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-32 mt-6">
                  <div className="form-control w-full">
                     <label className="label">
                        <span className="label-text text-[#000000] font-semibold">*Taste</span>
                     </label>
                     <input type="text" {...register("taste", { required: true })} placeholder="Taste" className="input input-bordered w-full" />
                  </div>
                  <div className="form-control w-full">
                     <label className="label">
                        <span className="label-text text-[#000000] font-semibold">*Category</span>
                     </label>
                     <input type="text" {...register("category", { required: true })} placeholder="Category" className="input input-bordered w-full" />
                  </div>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-32 mt-6">
                  <div className="form-control w-full">
                     <label className="label">
                        <span className="label-text text-[#000000] font-semibold">*Price</span>
                     </label>
                     <input type="text" {...register("price", { required: true })} placeholder="Price" className="input input-bordered w-full" />
                  </div>
                  <div>
                     <label className="label">
                        <span className="label-text text-[#000000] font-semibold">*Image</span>
                     </label>
                     <input {...register("image", { required: true })} type="file" className="file-input w-full" />
                  </div>
               </div>
               <button className="btn bg-[#9b6927] mt-8 text-white cursor-pointer">
                  Add Coffee
               </button>
            </form>
         </div>
      </div>
   );
};

export default AddCoffee;