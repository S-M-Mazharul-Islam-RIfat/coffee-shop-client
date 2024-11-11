import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateCoffee = () => {
   const { _id, name, chef, supplier, taste, category, price, image } = useLoaderData();
   const axiosSecure = useAxiosSecure();
   const {
      register,
      handleSubmit,
   } = useForm();


   const onSubmit = async (data) => {
      console.log(data);
      let imageURL = image
      if (data.image[0]) {
         const imageFile = { image: data.image[0] };
         const res = await axiosSecure.post(image_hosting_api, imageFile, {
            headers: {
               'content-type': 'multipart/form-data'
            }
         })
         imageURL = res.data.data.display_url;
      }

      const updatedCoffee = {
         name: data.name,
         chef: data.chef,
         supplier: data.supplier,
         taste: data.taste,
         category: data.category,
         price: data.price,
         image: imageURL
      }
      console.log(updatedCoffee);

      const updatedCoffeeResult = await axiosSecure.patch(`/coffee/${_id}`, updatedCoffee);

      if (updatedCoffeeResult.data.modifiedCount) {
         Swal.fire({
            position: "center",
            icon: "success",
            title: "Coffee Updated Successfully",
            showConfirmButton: false,
            timer: 1500
         });
      }
   }

   return (
      <div>
         <div>
            <SectionTitle heading={"Update Coffee"}></SectionTitle>
         </div>

         <div className="w-full md:w-[85%] mx-auto mt-8">
            <form onSubmit={handleSubmit(onSubmit)}>
               <div className="form-control w-full mt-6">
                  <label className="label">
                     <span className="label-text text-[#000000] font-semibold">*Name</span>
                  </label>
                  <input defaultValue={name} type="text" {...register("name", { required: true })} placeholder="Name" className="input input-bordered w-full" />
               </div>
               <div className="form-control w-full mt-6">
                  <label className="label">
                     <span className="label-text text-[#000000] font-semibold">*Chef</span>
                  </label>
                  <input defaultValue={chef} type="text" {...register("chef", { required: true })} placeholder="Chef" className="input input-bordered w-full" />
               </div>
               <div className="form-control w-full mt-6">
                  <label className="label">
                     <span className="label-text text-[#000000] font-semibold">*Supplier</span>
                  </label>
                  <input defaultValue={supplier} type="text" {...register("supplier", { required: true })} placeholder="Supplier" className="input input-bordered w-full" />
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-32 mt-6">
                  <div className="form-control w-full">
                     <label className="label">
                        <span className="label-text text-[#000000] font-semibold">*Taste</span>
                     </label>
                     <input defaultValue={taste} type="text" {...register("taste", { required: true })} placeholder="Taste" className="input input-bordered w-full" />
                  </div>
                  <div className="form-control w-full">
                     <label className="label">
                        <span className="label-text text-[#000000] font-semibold">*Category</span>
                     </label>
                     <input defaultValue={category} type="text" {...register("category", { required: true })} placeholder="Category" className="input input-bordered w-full" />
                  </div>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-32 mt-6">
                  <div className="form-control w-full">
                     <label className="label">
                        <span className="label-text text-[#000000] font-semibold">*Price</span>
                     </label>
                     <input defaultValue={price} type="text" {...register("price", { required: true })} placeholder="Price" className="input input-bordered w-full" />
                  </div>
                  <div>
                     <label className="label">
                        <span className="label-text text-[#000000] font-semibold">Image</span>
                     </label>
                     <input {...register("image")} type="file" className="file-input w-full" />
                  </div>
               </div>
               <button className="btn bg-[#9b6927] mt-8 text-white cursor-pointer">
                  Update Coffee
               </button>
            </form>
         </div>
      </div>
   );
};

export default UpdateCoffee;