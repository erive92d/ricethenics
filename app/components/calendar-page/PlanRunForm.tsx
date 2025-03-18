"use client";

import { useState } from "react";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PlanRunForm = () => {
    const router = useRouter();
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [time, setTime] = useState("");
    const [park, setPark] = useState("");
    const [location, setLocation] = useState("");
    const [error, setError] = useState("");

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
                date: selectedDate ? selectedDate.toISOString().split("T")[0] : null,
                time,
                park,
                location,
                createdAt: new Date(),
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
                <DatePicker
                    selected={selectedDate}
                    onChange={(date: Date | null) => setSelectedDate(date)}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select Date"
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
