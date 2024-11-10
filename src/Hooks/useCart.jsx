import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useCart = (email) => {
   const axiosSecure = useAxiosSecure();
   const { data: cart = [], isPending: loading, refetch } = useQuery({
      queryKey: ['cart'],
      queryFn: async () => {
         const res = await axiosSecure.get(`/cart/${email}`)
         return res.data;
      }
   })

   return [cart, loading, refetch];
};

export default useCart;