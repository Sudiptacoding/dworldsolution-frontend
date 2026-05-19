import axios from "axios";

const instance = axios.create({
  baseURL: "https://dworldsolution-backend.onrender.com",
  // baseURL: 'https://dworldsolution-backend.onrender.com',
});

const useAxios = () => {
  return instance;
};

export default useAxios;
