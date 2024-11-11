import { useState } from "react";
import { FaUsers } from "react-icons/fa";
import { GoCodeReview } from "react-icons/go";
import { IoMdHome, IoMdReorder } from "react-icons/io";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdOutlineMenu, MdPayment } from "react-icons/md";
import { RiListUnordered } from "react-icons/ri";
import { VscCoffee } from "react-icons/vsc";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";

const Dashboard = () => {
   const [isOpen, setIsOpen] = useState(false);
   const [isAdmin] = useAdmin();

   return (
      <div className="flex w-full">
         {
            isAdmin ?
               <div className="flex">
                  <div className="absolute top-4 left-4 md:hidden z-50">
                     <button onClick={() => setIsOpen(!isOpen)} className="text-3xl">
                        {isOpen ? "✕" : "☰"}
                     </button>
                  </div>
                  <div
                     className={`fixed top-0 left-0 h-full w-64 bg-[#D2B48C] text-black p-4 z-40 transform transition-transform 
                  ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative md:min-h-screen md:flex md:flex-col`}
                  >
                     <div className="py-4">
                        <NavLink to="/">
                           <p className="text-center text-[1.8rem] font-semibold pt-2 w-[90%] mx-auto">COFFEE SHOP</p>
                        </NavLink>
                     </div>
                     <ul className="menu p-4t text-[0.9rem] leading-7">
                        <li className="font-medium">
                           <NavLink to="/dashboard/addCoffee">
                              <IoAddCircleOutline />
                              Add Coffee
                           </NavLink>
                        </li>
                        <li className="font-medium">
                           <NavLink to="/dashboard/manageCoffee">
                              <VscCoffee />
                              Manage Coffee
                           </NavLink>
                        </li>
                        <li className="font-medium">
                           <NavLink to="/dashboard/manageOrders">
                              <IoMdReorder />
                              Manage Orders
                           </NavLink>
                        </li>
                        <li className="font-medium">
                           <NavLink to="/dashboard/manageAllUsers">
                              <FaUsers />
                              Manage All Users
                           </NavLink>
                        </li>
                     </ul>
                     <div className="divider m-0 w-52 mx-auto"></div>
                     <ul className="menu p-4 text-[0.9rem] leading-7">
                        <li className="font-medium">
                           <NavLink to="/">
                              <IoMdHome />
                              Home
                           </NavLink>
                        </li>
                        <li className="font-medium">
                           <NavLink to="/menu">
                              <MdOutlineMenu />
                              Menu
                           </NavLink>
                        </li>
                     </ul>
                  </div>

                  {isOpen && (
                     <div
                        className="fixed inset-0 md:hidden"
                        onClick={() => setIsOpen(false)}
                     />
                  )}
               </div>
               :
               <div className="flex">
                  <div className="absolute top-4 left-4 md:hidden z-50">
                     <button onClick={() => setIsOpen(!isOpen)} className="text-3xl">
                        {isOpen ? "✕" : "☰"}
                     </button>
                  </div>
                  <div
                     className={`fixed top-0 left-0 h-full w-64 bg-[#D2B48C] text-black p-4 z-40 transform transition-transform 
                     ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative md:min-h-screen md:flex md:flex-col`}
                  >
                     <div className="py-4">
                        <NavLink to="/">
                           <p className="text-center text-[1.8rem] font-semibold pt-2 w-[90%] mx-auto">COFFEE SHOP</p>
                        </NavLink>
                     </div>
                     <ul className="menu p-4 text-[0.9rem] leading-7">
                        <li className="font-medium">
                           <NavLink to="/dashboard/myCart">
                              <RiListUnordered />
                              My Cart
                           </NavLink>
                        </li>
                        <li className="font-medium">
                           <NavLink to="/dashboard/paymentHistory">
                              <MdPayment />
                              Payment History
                           </NavLink>
                        </li>
                        <li className="font-medium">
                           <NavLink to="/dashboard/orderHistory">
                              <GoCodeReview />
                              Order History
                           </NavLink>
                        </li>
                     </ul>
                     <div className="divider m-0 w-52 mx-auto"></div>
                     <ul className="menu p-4 text-[0.9rem] leading-7">
                        <li className="font-medium">
                           <NavLink to="/">
                              <IoMdHome />
                              Home
                           </NavLink>
                        </li>
                        <li className="font-medium">
                           <NavLink to="/menu">
                              <MdOutlineMenu />
                              Menu
                           </NavLink>
                        </li>
                     </ul>
                  </div>

                  {isOpen && (
                     <div
                        className="fixed inset-0 md:hidden"
                        onClick={() => setIsOpen(false)}
                     />
                  )}

               </div>
         }
         <div className="flex-1 p-12">
            <Outlet></Outlet>
         </div>
      </div>
   );
};

export default Dashboard;