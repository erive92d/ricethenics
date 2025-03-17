import React from 'react'
import { testingData } from '../test-data/testing'


export default function page() {

    return (
        <div className="min-h-screen bg-black py-10 px-6">
            <h1 className="text-3xl font-bold text-center text-lime-400 mb-6">
                Recent Runs
            </h1>

            <div className="max-w-3xl mx-auto space-y-6">
                {testingData.map((run, index) => (
                    <div key={index} className="bg-gray-700 shadow-lg rounded-lg p-6 border-l-4 border-lime-400">
                        <h2 className="text-xl font-semibold text-lime-400">{run.title}</h2>
                        <p className="text-white">
                            <span className="font-medium">Organizer:</span> {run.author}
                        </p>
                        <p className="text-white">
                            <span className="font-medium">Park:</span> {run.park}
                        </p>
                        <p className="text-white">
                            <span className="font-medium">Location:</span> {run.location}
                        </p>
                        <p className="text-white">
                            <span className="font-medium">Time:</span> {run.timeStart} - {run.timeEnd}
                        </p>
                        <p className="text-white">
                            <span className="font-medium">Distance:</span> {run.miles} miles
                        </p>
                        <p className="italic text-blue-600 mt-2">"{run.comment}"</p>
                    </div>
                ))}
            </div>
        </div>
    );


}
