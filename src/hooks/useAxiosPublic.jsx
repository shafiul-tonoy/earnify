import axios from "axios";

export default function useAxiosPublic() {
  const axiosPublic = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
  });
  return axiosPublic;
}