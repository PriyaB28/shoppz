import { useMutation, useQuery } from '@tanstack/react-query'
import { registerApi, verifyEmailApi } from "../api/backendApi"

export const useEmailVerificationQuery = (otp) => {
    return useMutation({
        queryKey: ['emailVerification'],
        queryFn: () => {
            return  verifyEmailApi(data)
                : null
        },
        enabled:data
    })
}