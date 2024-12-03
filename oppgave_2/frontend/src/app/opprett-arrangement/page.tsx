"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { Events } from '@/types/types';

const OpprettArrangementPage = () => {
    const router = useRouter();
    const [selectedType, setSelectedType] = useState<string>('');
    const [eventTypes, setEventTypes] = useState<string[]>([]);
    const [mals, setMals] = useState<any[]>([]);
    const [formData, setFormData] = useState<Events>({
        id: uuidv4(),
        title: '',
        date: new Date(),
        type: '',
        description: '',
        location: '',
        tickets: [
            {
                price: 0,
                type: '',
                availableSeats: 0,
            },
        ],
    });

    const fetchEventTypes = async () => {
        try {
            const response = await fetch('http://localhost:3999/mals');
            if (!response.ok) {
                throw new Error("failed to fetch event types");
            }
            const data = await response.json();
            const types = data.map((mal: { title: string; }) => mal.title);
            setEventTypes(types);
            setMals(data);
        } catch (error) {
            console.error("Failed to fetch event types", error);
        }
    };

    useEffect(() => {
        fetchEventTypes();
    }, []);

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedTitle = e.target.value;
        setSelectedType(selectedTitle);
        const selectedMal = mals.find((mal) => mal.title === selectedTitle);
        if (selectedMal) {
            setFormData({
                title: selectedMal.title || '',
                type: selectedMal.type || '',
                description: selectedMal.description || '',
                price: selectedMal.price || 0,
                availableSeats: selectedMal.availableSeats || 0,
                location: selectedMal.location || '',
                date: selectedMal.date || '',
            });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: type === 'number' ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        console.log(formData);
        try {
            const response = await fetch('http://localhost:3999/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error:', errorData);
                return;
            }

            const result = await response.json();
            console.log('Success:', result);
            router.push('/opprett-arrangement');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Opprett Arrangement</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Bruk Mal:</label>
                    <select
                        value={selectedType}
                        onChange={handleTypeChange}
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
                        id="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Type:</label>
                    <input
                        type="text"
                        id="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Beskrivelse:</label>
                    <input
                        type="text"
                        id="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Pris:</label>
                    <div className="flex items-center">
                        <input
                            type="number"
                            id="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="ml-2">Kr.</span>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Plasser:</label>
                    <input
                        type="number"
                        id="availableSeats"
                        value={formData.availableSeats}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Sted:</label>
                    <input
                        type="text"
                        id="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Dato:</label>
                    <input
                        type="date"
                        id="date"
                        value={formData.date}
                        onChange={handleChange}
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
    );
};

export default OpprettArrangementPage;