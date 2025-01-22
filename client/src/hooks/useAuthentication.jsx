import { useMutation, useQuery } from '@tanstack/react-query'
import { registerApi } from "../api/backendApi"

export const useRegisterQuery = (data={}) => {
    console.log(Object.values(data).length);
    return useMutation({
        mutationFn: (data) =>registerApi(data)
    })
    // return useMutation({
    //     queryKey: ['register',data.name],
    //     queryFn: () => {
    //         return Object.values(data).length == 5 ? registerApi(data)
    //             : null
    //     },
    //     enabled:data
    // })
}