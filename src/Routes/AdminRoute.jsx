import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";
import Loader from "../Pages/Shared/Loader/Loader";

const AdminRoute = ({ children }) => {
   const { user, loading } = useAuth();
   const [isAdmin, isAdminLoading] = useAdmin();
   const location = useLocation();

   if (loading || isAdminLoading) {
      return <Loader></Loader>
   }

   if (user && isAdmin) {
      return children;
   }

   return <Navigate to="/login" state={{ from: location }} replace={true}></Navigate>
};

export default AdminRoute;