
"use client";

import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Run {
    id: string;
    date: string;
    time: string;
    park: string;
    location: string;
    postBy: string
}

export default function ListRuns() {
    const [runs, setRuns] = useState<Run[]>([]);

    useEffect(() => {
        const runsCollection = collection(db, "runs");

        // Fetch runs in real time
        const unsubscribe = onSnapshot(runsCollection, (snapshot) => {
            const fetchedRuns = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Run[];
            setRuns(fetchedRuns);
        });

        return () => unsubscribe(); // Cleanup listener when unmounted
    }, []);

    console.log(runs)

    return (
        <div className="max-w-4xl mx-auto p-6">
            {runs.length > 0 ? (
                <ul className="space-y-4">
                    {runs.map((run) => (
                        <li key={run.id} className="p-4 border border-lime-400 rounded bg-gray-800 text-white">
                            <p><strong>Date:</strong> {run.date}</p>
                            <p><strong>Time:</strong> {run.time}</p>
                            <p><strong>Park:</strong> {run.park}</p>
                            <p><strong>Location:</strong> {run.location}</p>
                            <p><strong>Planned by:</strong> {run.postBy}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-400">No runs planned yet.</p>
            )}
        </div>
    );
}
