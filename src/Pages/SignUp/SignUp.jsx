import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const SignUp = () => {
   const { googleSignIn, createUser } = useAuth();
   const axiosPublic = useAxiosPublic();
   const navigate = useNavigate();
   const location = useLocation();
   const from = location.state?.from?.pathname || '/';

   const {
      register,
      handleSubmit,
      reset
   } = useForm()


   const onSubmit = async (data) => {
      const newUserName = data.name, newUserEmail = data.email, newUserPassword = data.password;
      const newUser = {
         name: newUserName,
         email: newUserEmail,
         role: "user"
      }
      const userAlreadyExist = await axiosPublic.get(`/allUsers/${newUserEmail}`);
      if (userAlreadyExist.data) {
         Swal.fire({
            position: "top-end",
            icon: "error",
            title: "User Already Exist",
            showConfirmButton: false,
            timer: 1500
         });
      }
      else {
         createUser(newUserEmail, newUserPassword)
            .then(async (res) => {
               console.log(res);
               const result = await axiosPublic.post('/allUsers', newUser);
               if (result.data.insertedId) {
                  Swal.fire({
                     position: "top-end",
                     icon: "success",
                     title: "Sign Up Successfully",
                     showConfirmButton: false,
                     timer: 1500
                  });
                  reset();
                  navigate(from, { replace: true });
               }
            })
      }
   }

   const handleGoogleSignUp = () => {
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
               console.log(res);
               console.log(result);
               if (result.data.insertedId) {
                  Swal.fire({
                     position: "top-end",
                     icon: "success",
                     title: "Sign Up Successfully",
                     showConfirmButton: false,
                     timer: 1500
                  });
                  navigate(from, { replace: true });
               }
            }
         })
   }

   return (
      <div className="h-[76vh]">
         <Helmet>
            <title>Sign Up</title>
         </Helmet>

         <div className="w-[85%] mx-auto">
            <div className="max-w-md mx-auto bg-[#ffff] p-8 mt-20 rounded-lg shadow-2xl">
               <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">Name</span>
                     </label>
                     <input type="text" {...register("name")} placeholder="Name" className="input input-bordered h-[2.5rem] rounded-lg bg-slate-200" required />
                  </div>
                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">Email</span>
                     </label>
                     <input type="email" {...register("email")} placeholder="Email" className="input input-bordered h-[2.5rem] rounded-lg bg-slate-200" required />
                  </div>
                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">Password</span>
                     </label>
                     <input type="password"  {...register("password")} placeholder="Password" className="input input-bordered h-[2.5rem] rounded-lg bg-slate-200" required />
                     <label className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                     </label>
                  </div>
                  <div className="form-control mt-6">
                     <button className="btn bg-[#F3F5F9] text-[black] hover:bg-slate-200 rounded-lg">Sign Up</button>
                  </div>
                  <div className="mt-4 text-center">
                     <p>Already have an account? <Link to="/login"><span className="hover:underline">Login</span></Link> </p>
                  </div>
                  <div>
                     <div className="divider">or</div>
                  </div>
                  <div className="form-control mt-4">
                     <div onClick={handleGoogleSignUp} className="btn bg-[#05070A] text-[white] hover:bg-[#000000] rounded-lg">
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

export default SignUp;