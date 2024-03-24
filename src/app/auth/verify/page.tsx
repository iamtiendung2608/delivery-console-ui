"use client";

import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import {ResendOTP, VerifySubmit} from "@/app/auth/verify/verify";
import {useRouter} from "next/navigation";
import { useSearchParams } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';

const OTPVerification: React.FC = () => {
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
    const currentRouter = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get('email')
    const id = searchParams.get('id')

    useEffect(() => {
        document.getElementById('otp-0')?.focus();
    }, []);

    // React on OTP change
    useEffect(() => {
        // Trigger submit when all otp fields are filled
        if (otp.every(val => val) && otp.length === 6) {
            handleSubmit();
        }
    }, [otp]); // Depend on OTP to trigger

    const handleChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        const newOtp = [...otp];
        const { value } = event.target;

        if (/^[0-9]$/.test(value) || value === '') {
            newOtp[index] = value;
            setOtp(newOtp);

            // Move focus forward on input, backward on delete unless at the first input
            if (value && index < otp.length - 1) {
                document.getElementById(`otp-${index + 1}`)?.focus();
            }
        }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>, index: number) => {
        if (event.key === 'Backspace' && otp[index] === '') {
            const prevIndex = index - 1;
            if (prevIndex >= 0) {
                document.getElementById(`otp-${prevIndex}`)?.focus();
            }
        }
    };

    const handleSubmit = async () => {
        const otpCode = otp.join('');
        console.log("Submitting OTP: ", otpCode);

        // Assuming VerifySubmit is a function that handles the OTP verification logic
        var res = await VerifySubmit({
            id: Number(id),
            code: otpCode,
        });

        if (!res.ok) {
            window.alert("Verification error, please try again");
            setOtp(new Array(6).fill(''));
            document.getElementById('otp-0')?.focus();
            return;
        }
        currentRouter.push('/auth/login');
    };

    const handleResendOTP = async () => {
        const res = await ResendOTP(Number(id));

        if (res.ok) {
            window.alert("Resend OTP success, please check your email!");
            setOtp(new Array(6).fill(''));
            document.getElementById('otp-0')?.focus();
            return;
        }
    }

    return (
        <div className="h-screen bg-gray-50 py-20 px-3">
            <div className="container mx-auto">
                <div className="max-w-sm mx-auto md:max-w-lg">
                    <div className="w-full">
                        <div
                            className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 bg-white h-64 max-h-80">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">OTP
                                Verification</h1>
                            <div className="flex flex-col mt-4">
                                <span>Enter the OTP you received at</span>
                                <span className="font-bold">{email}</span>
                            </div>
                            <div className="flex flex-row justify-center text-center px-2 mt-5">
                                {otp.map((data, index) => (
                                    <input
                                        className="m-2 border h-10 w-10 text-center form-control rounded"
                                        type="text"
                                        id={`otp-${index}`}
                                        maxLength={1}
                                        value={data}
                                        onChange={(e) => handleChange(e, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        key={index}
                                    />
                                ))}
                            </div>
                            <div className="flex justify-center text-center mt-5">
                                <button className="flex items-center text-blue-700 hover:text-blue-900 cursor-pointer" onClick={handleResendOTP}>
                                    <span
                                        className="font-medium text-primary-600 hover:underline dark:text-primary-500">Resend OTP</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OTPVerification;
