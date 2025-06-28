import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { generateOTP, verifyOTP } from "@/service/api";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
export default function Recovery() {
    const [email, setEmail] = useState("");
    const [OTP, setOTP] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const navigate = useNavigate();

    async function requestOTP() {
        if (!email) return toast.error("Please enter your email.");

        try {
            const code = await generateOTP(email);
            if (code) {
                console.log("Generated OTP: ${code}",code);
                toast.success("OTP has been sent to your email!");
                setOtpSent(true);
            } else {
                toast.error("Problem while generating OTP!");
            }
        } catch (error) {
            toast.error("Failed to send OTP.");
            console.error("Error sending OTP:", error);
        }
    }

    async function onSubmit(e) {
        e.preventDefault();
        
        try {
            
            const temp=await axios.post('http://localhost:5000/createResetSession', { email:email });
            const response = await verifyOTP(email, OTP);
            if (response?.success) {
                toast.success("Verified Successfully!");
                navigate("/reset",{ state: { email } });
            } else {
                toast.error("Wrong OTP! Check your email again.");
            }
        } catch (error) {
            toast.error("An error occurred while verifying OTP.");
            console.error("Verification Error:", error);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center border border-gray-200">
                <h4 className="text-3xl font-bold text-gray-800">Recovery</h4>
                <p className="text-gray-500 mt-2">Enter your email to receive an OTP.</p>

                {!otpSent ? (
                    <div className="mt-4">
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
                            type="email"
                            placeholder="Enter your email"
                        />
                        <button
                            onClick={requestOTP}
                            className="mt-4 w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded-lg transition"
                        >
                            Send OTP
                        </button>
                    </div>
                ) : (
                    <form className="mt-6" onSubmit={onSubmit}>
                        <input
                            value={OTP}
                            onChange={(e) => setOTP(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none text-center text-lg"
                            type="text"
                            placeholder="Enter OTP"
                            maxLength={6}
                        />
                        <button type="submit" className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded-lg transition">
                            Verify OTP
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}