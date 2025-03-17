"use client"
import { useState } from "react";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Account created!");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto">
            <h1 className="text-xl font-bold">Sign Up</h1>
            <input
                type="email"
                placeholder="Email"
                className="border p-2 w-full my-2"
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                className="border p-2 w-full my-2"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSignUp} className="bg-blue-500 text-white p-2 w-full">
                Sign Up
            </button>
        </div>
    );
};

export default SignUp;
