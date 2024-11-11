import axios from "axios";

const axiosPublic = axios.create({
   baseURL: 'https://coffee-shop-server-ivory.vercel.app'
})
const useAxiosPublic = () => {
   return axiosPublic;
};

export default useAxiosPublic;