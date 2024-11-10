import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useCoffee = () => {
   const axiosPublic = useAxiosSecure();
   const { data: coffee = [], isPending: loading, refetch } = useQuery({
      queryKey: ['coffee'],
      queryFn: async () => {
         const res = await axiosPublic.get('/coffee')
         return res.data;
      }
   })

   return [coffee, loading, refetch];
};

export default useCoffee;