import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useOrders = (email) => {
   const axiosSecure = useAxiosSecure();
   const { data: orders = [], isPending: loading, refetch } = useQuery({
      queryKey: ['orders'],
      queryFn: async () => {
         const api = (email ? `/${email}` : ``);
         const res = await axiosSecure.get(`/orders${api}`)
         return res.data;
      }
   })

   return [orders, loading, refetch];
};

export default useOrders;