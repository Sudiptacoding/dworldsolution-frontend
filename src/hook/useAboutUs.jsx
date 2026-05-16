import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useAboutUs = () => {
    const axiosData = useAxios()
    const { isPending, error, data: aboutUs, refetch } = useQuery({
        queryKey: ['useAboutUs'],
        queryFn: () =>
            axiosData.get(`/about-us`)
                .then(res => {
                    return (res?.data)
                })
    })
    return { isPending, error, aboutUs, refetch }
};

export default useAboutUs;