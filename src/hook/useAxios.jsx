import axios from "axios";

const instance = axios.create({
  baseURL: "https://dworldsolution-backend.vercel.app",
  // baseURL: 'https://dworldsolution-backend.vercel.app',
});

const useAxios = () => {
  return instance;
};

export default useAxios;
