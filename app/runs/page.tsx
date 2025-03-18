"use client"
import React from 'react'
import ListRuns from '../components/runs-page/ListRuns';


export default function page() {

    return (
        <div className="min-h-screen bg-black py-10 px-6">
            <h1 className="text-3xl font-bold text-center text-lime-400 mb-6">
                Upcoming Runs
            </h1>
            <ListRuns />
        </div>
    );


}
