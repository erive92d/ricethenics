"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase"; // Ensure you have Firebase configured
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

const avatars = ["/frunnerAvatar.png", "/mrunnerAvatar.png"]; // Avatars in public folder

const SignupForm = () => {
    const router = useRouter();
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]); // Default avatar
    const [error, setError] = useState("");

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); // Reset error message

        try {
            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            console.log("User created:", user); // Log user details for debugging

            // Store user data in Firestore
            await setDoc(doc(db, "users", user.uid), {
                firstName,
                email,
                avatar: selectedAvatar,
                avgMilesPerRun: 0,
                avgDurationPerRun: "00:00",
                favoritePark: "",
            });

            // After successfully adding user data, redirect to home page
            console.log("User data stored successfully, redirecting to home...");
            router.push("/");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error("Firebase error:", err); // Log the full error object for more details
            if (err.code === 'auth/weak-password') {
                setError("Password is too weak!");
            } else if (err.code === 'auth/email-already-in-use') {
                setError("Email already in use!");
            } else {
                setError("An error occurred. Please try again later.");
            }
        }
    };

    return (
        <div className="min-h-screen max-w-md mx-auto bg-black p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <form onSubmit={handleSignup} className="space-y-4">
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="w-full p-2 border rounded"
                />
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

                {/* Avatar Selection */}
                <div>
                    <p className="mb-2">Choose an avatar:</p>
                    <div className="flex gap-4">
                        {avatars.map((avatar) => (
                            <div
                                key={avatar}
                                className={`p-1 border-2 rounded-full cursor-pointer ${selectedAvatar === avatar ? "border-blue-500" : "border-gray-300"
                                    }`}
                                onClick={() => setSelectedAvatar(avatar)}
                            >
                                <Image src={avatar} alt="Avatar" width={50} height={50} className="rounded-full" />
                            </div>
                        ))}
                    </div>
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                    Sign Up
                </button>
            </form>
            <div className="text-center mt-4">
                <p className="text-sm">
                    Already have an account?{" "}
                    <Link href="/auth/login" className="text-blue-500 hover:underline">
                        Log in here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignupForm;
