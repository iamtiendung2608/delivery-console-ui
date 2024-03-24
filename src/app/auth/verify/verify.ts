import {VerificationRequest} from "@/app/auth/verify/types";


export const VerifySubmit = async (verificationReq: VerificationRequest): Promise<Response> => {
    return await fetch(`http://localhost:8080/auth/verify`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(verificationReq)
    });
}

export const ResendOTP = async (id: number) => {
    return await fetch(`http://localhost:8080/auth/resend-verification`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "id" : id
        })
    });
}