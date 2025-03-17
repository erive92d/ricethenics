"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase'; // Firebase imports
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore'; // Firestore imports
import Image from 'next/image';



export default function Navbar() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [user, setUser] = useState<any | null>(null); // Store user information
    const [avatar, setAvatar] = useState<string | null>(null); // Store avatar URL
    const router = useRouter();

    // Listen for authentication state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                // User is logged in, fetch user data from Firestore
                setUser(currentUser);
                fetchUserData(currentUser.uid); // Fetch user data (avatar and other details)
            } else {
                // User is not logged in
                setUser(null);
                setAvatar(null); // Reset avatar
            }
        });

        return () => unsubscribe(); // Cleanup listener
    }, []);

    // Fetch user data (including avatar) from Firestore
    const fetchUserData = async (uid: string) => {
        try {
            const userDocRef = doc(db, 'users', uid);
            const userDocSnap = await getDoc(userDocRef);
            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();
                setAvatar(userData.avatar); // Set the avatar from Firestore
            } else {
                console.log("No user data found!");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
        router.push('/'); // Redirect to home page after logout
    };

    return (
        <div className="navbar bg-black py-8 lg:px-12 px-2 border-b border-lime-300">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu text-lg menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li><Link href="/runs">Runs</Link></li>
                        <li><Link href="/calendar">Calendar</Link></li>
                        <li><Link href="/about">About</Link></li>
                    </ul>
                </div>
                <Link href="/" className="btn btn-ghost text-2xl text-lime-400 italic font-bold">RICETHENICS</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-lg">
                    <li><Link href="/runs">Runs</Link></li>
                    <li><Link href="/calendar">Calendar</Link></li>
                    <li><Link href="/about">About</Link></li>
                </ul>
            </div>
            <div className="navbar-end">
                {user ? (
                    <div className="flex items-center gap-2">
                        {avatar && (
                            <Image
                                src={avatar} // Display avatar fetched from Firestore
                                alt="User Avatar"
                                className="rounded-full w-12 h-12"
                                width={50}
                                height={50}
                            />
                        )}
                        {/* Log out button */}
                        <button
                            onClick={handleLogout}
                            className="btn btn-ghost bg-red-600 text-white"
                        >
                            Log Out
                        </button>
                    </div>
                ) : (
                    <Link href="/auth/signup" className="btn btn-ghost bg-lime-400 text-black">Join us</Link>
                )}
            </div>
        </div>
    );
}
