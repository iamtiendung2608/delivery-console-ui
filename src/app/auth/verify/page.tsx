"use client";

import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';

const OTPVerification: React.FC = () => {
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));

    useEffect(() => {
        document.getElementById('otp-0')?.focus();
    }, []);

    const handleChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        const value = event.target.value; // Correct way to access the value
        if (/^[0-9]$/.test(value)) {
            setOtp([...otp.map((d, idx) => (idx === index ? value : d))]);
            if (index < otp.length - 1) {
                const nextSibling = document.getElementById(`otp-${index + 1}`) as HTMLInputElement;
                nextSibling?.focus();
            }
        } else if (value === '') {
            setOtp([...otp.map((d, idx) => (idx === index ? '' : d))]);
        }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>, index: number) => {
        if (event.key === 'Backspace') {
            if (index !== 0) {
                const prevSibling = document.getElementById(`otp-${index - 1}`) as HTMLInputElement;
                prevSibling?.focus();
            }
        }
    };

    return (
        <div className="h-screen bg-gray-50 py-20 px-3">
            <div className="container mx-auto">
                <div className="max-w-sm mx-auto md:max-w-lg">
                    <div className="w-full">
                        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 bg-white h-64 max-h-80">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">OTP Verification</h1>
                            <div className="flex flex-col mt-4">
                                <span>Enter the OTP you received at</span>
                                <span className="font-bold">ptdung2608@gmail.com</span>
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
                                <a className="flex items-center text-blue-700 hover:text-blue-900 cursor-pointer">
                                    <span className="font-medium text-primary-600 hover:underline dark:text-primary-500">Resend OTP</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OTPVerification;
