"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase"; // Firebase imports
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginForm = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); // Reset error state

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("Login successful", userCredential.user);
            router.push("/"); // Redirect to home page after successful login
        } catch (err) {
            console.error("Firebase error:", err);
            setError("Invalid email or password. Please try again.");
        }
    };

    return (
        <div className="min-h-screen max-w-md mx-auto bg-black p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center mb-4">Log In</h2>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <form onSubmit={handleLogin} className="space-y-4">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-2 border rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full p-2 border rounded"
                />

                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                    Log In
                </button>
            </form>

            {/* Link to Signup Page */}
            <div className="text-center mt-4">
                <p className="text-sm">
                    Need an account?{" "}
                    <Link href="/auth/signup" className="text-blue-500 hover:underline">
                        Sign up here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;
