import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useHeaderVideo = () => {
    const axiosData = useAxios()
    const { isPending, error, data: headerVideo, refetch } = useQuery({
        queryKey: ['useHeaderVideo'],
        queryFn: () =>
            axiosData.get(`/header-video`)
                .then(res => {
                    return (res?.data)
                })
    })
    return { isPending, error, headerVideo, refetch }
};

export default useHeaderVideo;