import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useAdmin from "../../../Hooks/useAdmin";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const NavBar = () => {
   const { user, logOut } = useAuth();
   const [isAdmin] = useAdmin();
   const axiosPublic = useAxiosPublic();
   const [userInfo, setUserInfo] = useState([]);

   useEffect(() => {
      axiosPublic.get(`/allUsers/${user?.email}`)
         .then(res => {
            setUserInfo(res.data);
         })
   }, [axiosPublic, user?.email])

   const handleLogout = () => {
      logOut()
         .then(res => {
            Swal.fire({
               position: "top-end",
               icon: "success",
               title: "Logout Successfully",
               showConfirmButton: false,
               timer: 1500
            });
         })
   }

   const navOptions = <>
      <li>
         <Link to="/"> <span className="font-bold rounded-md">HOME</span> </Link>
      </li>
      <li>
         <NavLink to="/menu"><span className="font-bold rounded-md">MENU</span></NavLink>
      </li>
      {
         user &&
         <li>
            <NavLink to={`/dashboard/${isAdmin ? 'addCoffee' : 'myCart'}`}>
               <span className="font-bold rounded-md flex gap-1">
                  DASHBOARD
               </span>
            </NavLink>
         </li>
      }
      {
         user ?
            <li onClick={handleLogout} >
               <Link><button className="font-bold rounded-md">LOGOUT</button></Link>
            </li>
            :
            <li>
               <NavLink to="/login"><span className="font-bold rounded-md">LOGIN</span></NavLink>
            </li>
      }
   </>

   return (
      <div>
         <div className="navbar w-full bg-base-100 mx-auto sticky top-0 shadow-sm z-50 lg:pl-12 lg:pr-12">
            <div className="navbar-start">
               <div className="dropdown">
                  <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth="2"
                           d="M4 6h16M4 12h8m-8 6h16" />
                     </svg>
                  </div>
                  <ul
                     tabIndex={0}
                     className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                     {
                        navOptions
                     }
                  </ul>
               </div>
               <Link to="/">
                  <div className="w-10 rounded">
                     <img src="https://i.ibb.co.com/qmps4KW/logo1.png" />
                  </div>
               </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
               <ul className="menu menu-horizontal px-1">
                  {
                     navOptions
                  }
               </ul>
            </div>
            <div className="navbar-end font-medium underline">
               <a>{userInfo?.name}</a>
            </div>
         </div>
      </div>
   );
};

export default NavBar;