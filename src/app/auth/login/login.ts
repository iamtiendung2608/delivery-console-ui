// handleLogin.ts
import {LoginRequest} from '@/app/auth/login/types'; // Adjust the path as necessary

export const handleLogin = async (loginRequest: LoginRequest): Promise<Response> => {
    return await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginRequest),
    });
};