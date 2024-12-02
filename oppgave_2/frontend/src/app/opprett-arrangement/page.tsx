"use client";
import React, { useState } from 'react';

const eventTypes = ['Konsert', 'Festival', 'Teater', 'Standup', 'Kino', 'Annet'];

const OpprettArrangementPage = () => {
    const [selectedType, setSelectedType] = useState<string>();

    return (
        <div className="max-w-md mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Opprett Arrangement</h2>
            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Bruk Mal:</label>
                    <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Velg Mal</option>
                            {eventTypes.map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Navn:</label>
                    <input 
                        type="text" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Type:</label>
                    <input 
                        type="text" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Beskrivelse:</label>
                    <input 
                        type="text" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Pris:</label>
                    <div className="flex items-center">
                        <input
                            type="number"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="ml-2">Kr.</span>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Plasser:</label>
                    <input 
                        type="number" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Sted:</label>
                    <input 
                        type="text" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Dato:</label>
                    <input 
                        type="date" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button 
                    type="submit" 
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                    Opprett Arrangement
                </button>
            </form>
        </div>
    )
}

export default OpprettArrangementPage;