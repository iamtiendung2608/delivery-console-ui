import {SignupRequest, SignupResponse} from "@/app/auth/signup/types";
import {LoginResponse} from "@/app/auth/login/types";


export const handleSignUp = async (signUpRequest: SignupRequest): Promise<Response> => {

    const response = await fetch('http://localhost:8080/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(signUpRequest)
    });

    return await response.json();
}