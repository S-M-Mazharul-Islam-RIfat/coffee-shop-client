import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Dashboard from "../Layout/Dashboard";
import AddCoffee from "../Pages/DashBoard/Admin/AddCoffee/AddCoffee";
import ManageCoffee from "../Pages/DashBoard/Admin/ManageCoffee/ManageCoffee";
import UpdateCoffee from "../Pages/DashBoard/Admin/UpdateCoffee/UpdateCoffee";
import Menu from "../Pages/Menu/Menu";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import ManageOrders from "../Pages/DashBoard/Admin/ManageOrders/ManageOrders";
import ManageAllUsers from "../Pages/DashBoard/Admin/ManageAllUsers/ManageAllUsers";
import PaymentHistory from "../Pages/DashBoard/User/PaymentHistory/PaymentHistory";
import OrderHistory from "../Pages/DashBoard/User/OrderHistory/OrderHistory";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import Payment from "../Pages/DashBoard/User/Payment/Payment";
import MyCart from "../Pages/DashBoard/User/MyCart/MyCart";
import CoffeeDetails from "../Pages/CoffeeDetails/CoffeeDetails";
import NotFound from "../Pages/NotFound/NotFound";


export const router = createBrowserRouter([
   {
      path: '/',
      element: <Main></Main>,
      children: [
         {
            path: '/',
            element: <Home></Home>
         },
         {
            path: 'menu',
            element: <Menu></Menu>
         },
         {
            path: 'coffee/:id',
            element: <CoffeeDetails></CoffeeDetails>,
            loader: ({ params }) => fetch(`https://coffee-shop-server-ivory.vercel.app/coffee/${params.id}`)
         },
         {
            path: 'login',
            element: <Login></Login>
         },
         {
            path: 'signup',
            element: <SignUp></SignUp>
         }
      ]
   },
   {
      path: 'dashboard',
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children: [
         // admin routes
         {
            path: 'addCoffee',
            element: <AdminRoute><AddCoffee></AddCoffee></AdminRoute>
         },
         {
            path: 'manageCoffee',
            element: <AdminRoute><ManageCoffee></ManageCoffee></AdminRoute>
         },
         {
            path: 'updateCoffee/:id',
            element: <AdminRoute><UpdateCoffee></UpdateCoffee></AdminRoute>,
            loader: ({ params }) => fetch(`https://coffee-shop-server-ivory.vercel.app/coffee/${params.id}`)
         },
         {
            path: 'manageOrders',
            element: <AdminRoute><ManageOrders></ManageOrders></AdminRoute>
         },
         {
            path: 'manageAllUsers',
            element: <AdminRoute><ManageAllUsers></ManageAllUsers></AdminRoute>
         },

         // user routes
         {
            path: 'myCart',
            element: <MyCart></MyCart>
         },
         {
            path: 'payment',
            element: <Payment></Payment>
         },
         {
            path: 'paymentHistory',
            element: <PaymentHistory></PaymentHistory>
         },
         {
            path: 'orderHistory',
            element: <OrderHistory></OrderHistory>
         }
      ]
   },
   {
      path: '*',
      element: <NotFound></NotFound>
   }
]);