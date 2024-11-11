import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useState } from "react";

const Login = () => {
   const { googleSignIn, signIn } = useAuth();
   const axiosPublic = useAxiosPublic();
   const navigate = useNavigate();
   const location = useLocation();
   const from = location.state?.from?.pathname || '/';
   const [showPassword, setShowPassword] = useState(false);


   const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
   };

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm()


   const handelGoogleSignIn = () => {
      googleSignIn()
         .then(async (res) => {
            const newUser = {
               name: res.user.displayName,
               email: res.user.email,
               role: "user"
            }
            const userAlreadyExist = await axiosPublic.get(`/allUsers/${newUser.email}`);
            if (userAlreadyExist.data) {
               Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Login Successfully",
                  showConfirmButton: false,
                  timer: 1500
               });
               navigate(from, { replace: true });
            }
            else {
               const result = await axiosPublic.post('/allUsers', newUser);
               if (result.data.insertedId) {
                  Swal.fire({
                     position: "top-end",
                     icon: "success",
                     title: "Login Successfully",
                     showConfirmButton: false,
                     timer: 1500
                  });
                  navigate(from, { replace: true });
               }
            }
         })
   }

   const onSubmit = async (data) => {
      const currentUserEmail = data.email, currentUserPassword = data.password;
      const userAlreadyExist = await axiosPublic.get(`/allUsers/${currentUserEmail}`);
      if (userAlreadyExist.data) {
         signIn(currentUserEmail, currentUserPassword)
            .then(res => {
               Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Login Successfully",
                  showConfirmButton: false,
                  timer: 1500
               });
               navigate(from, { replace: true });
            })
            .catch(() => {
               Swal.fire({
                  position: "top-end",
                  icon: "error",
                  title: "User doesn't exist, please enter the email and password correctly",
                  showConfirmButton: false,
                  timer: 2000
               });
            })
      }
      else {
         Swal.fire({
            position: "top-end",
            icon: "error",
            title: "User doesn't exist, please signup",
            showConfirmButton: false,
            timer: 2000
         });
      }
   }

   return (
      <div className="h-screen">
         <Helmet>
            <title>Login</title>
         </Helmet>

         <div className="w-[85%] mx-auto">
            <div className="max-w-md mx-auto bg-[#ffff] p-8 mt-16 rounded-lg shadow-2xl">
               <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">Email</span>
                     </label>
                     <input type="email" {...register("email", { required: true })} placeholder="Email" className="input input-bordered h-[2.5rem] rounded-lg bg-slate-200 mb-2" />
                     {errors.email && <span className="text-red-600 text-[0.9rem]">Email is required</span>}
                  </div>
                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">Password</span>
                     </label>
                     <div className="relative">
                        <input type={showPassword ? 'text' : 'password'}  {...register("password", { required: true })} placeholder="Password" className="input input-bordered h-[2.5rem] rounded-lg bg-slate-200 w-full mb-2" />
                        <button
                           type="button"
                           onClick={togglePasswordVisibility}
                           className="absolute right-2 top-3"
                        >
                           {showPassword ? (
                              <IoMdEyeOff />
                           ) : (
                              <IoMdEye />
                           )}
                        </button>
                        {errors.password && <span className="text-red-600 text-[0.9rem]">Password is required</span>}
                     </div>
                  </div>
                  <div className="form-control mt-6">
                     <button className="btn bg-[#F3F5F9] text-[black] hover:bg-slate-200 rounded-lg">Login</button>
                  </div>
                  <div className="mt-4 text-center">
                     <p>Dont have an account? <Link to="/signup"><span className="hover:underline">Sign Up</span></Link> </p>
                  </div>
                  <div>
                     <div className="divider">or</div>
                  </div>
                  <div className="form-control mt-4">
                     <div onClick={handelGoogleSignIn} className="btn bg-[#05070A] text-[white] hover:bg-[#000000] rounded-lg">
                        <FcGoogle />
                        Sign In With Google
                     </div>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
};

export default Login;