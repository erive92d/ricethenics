"use client";

import { useState, useEffect, useRef } from "react";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

const PlanRunForm = () => {
    const router = useRouter();
    const [selectedDate, setSelectedDate] = useState("");
    const [time, setTime] = useState("");
    const [park, setPark] = useState("");
    const [location, setLocation] = useState("");
    const [error, setError] = useState("");
    const dateInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            import("pikaday").then((PikadayModule) => {
                const Pikaday = PikadayModule.default;
                new Pikaday({
                    field: dateInputRef.current!,
                    format: "YYYY-MM-DD",
                    onSelect: (date) => setSelectedDate(date.toISOString().split("T")[0]),
                });
            });
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const user = auth.currentUser;
        if (!user) {
            setError("You must be logged in to plan a run.");
            return;
        }


        try {
            const userDocRef = doc(db, "users", user.uid);
            const userDocSnap = await getDoc(userDocRef);

            if (!userDocSnap.exists()) {
                console.error("User data not found in Firestore");
                return;
            }

            const userData = userDocSnap.data();

            await addDoc(collection(db, "runs"), {
                userId: user.uid,
                postBy: userData.firstName,
                date: selectedDate,
                time,
                park,
                location,
                createdAt: new Date()
            });

            router.push("/runs"); // Redirect to runs page
        } catch (err) {
            console.error("Error saving run:", err);
            setError("Failed to save run. Please try again.");
        }
    };

    return (
        <div className="max-w-md mx-auto bg-black p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center mb-4">Plan a Run</h2>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    ref={dateInputRef}
                    placeholder="Select Date"
                    value={selectedDate}
                    readOnly
                    className="w-full p-2 border rounded bg-gray-100 cursor-pointer text-black"
                />

                <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                    className="w-full p-2 border rounded"
                />

                <input
                    type="text"
                    placeholder="Park Name"
                    value={park}
                    onChange={(e) => setPark(e.target.value)}
                    required
                    className="w-full p-2 border rounded"
                />

                <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    className="w-full p-2 border rounded"
                />

                <button type="submit" className="w-full bg-lime-400 text-black p-2 rounded hover:bg-lime-500">
                    Save Run
                </button>
            </form>
        </div>
    );
};

export default PlanRunForm;
