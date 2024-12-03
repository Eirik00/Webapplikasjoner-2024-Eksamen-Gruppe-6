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
    const [ticketTypes, setTicketTypes] = useState<number>(1);
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

    const calculateTotalSeats = () => {
        return formData.tickets.reduce((total, ticket) => total + ticket.availableSeats, 0);
    };

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
                ...formData,
                title: selectedMal.title || '',
                type: selectedMal.type || '',
                description: selectedMal.description || '',
                location: selectedMal.location || '',
                date: selectedMal.date ? new Date(selectedMal.date) : new Date(),
                tickets: [
                    {
                        price: selectedMal.price || 0,
                        type: '',
                        availableSeats: selectedMal.availableSeats || 0,
                    },
                ],
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

    const handleAddTickets = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const numberOfTickets = Number(value);

        if (value === "" || numberOfTickets < 1) {
            setTicketTypes(1);
            setFormData((prev) => ({
                ...prev,
                tickets: [
                    {
                        price: 0,
                        type: '',
                        availableSeats: 0,
                    },
                ],
            }));
        }else{
            setTicketTypes(numberOfTickets);
            const newTickets = Array.from({ length: numberOfTickets }, () => ({
                price: 0,
                type: '',
                availableSeats: 0,
            }));
            setFormData((prev) => ({
                ...prev,
                tickets: newTickets,
            }));
        }
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    
        const eventData = {
            ...formData,
            date: new Date(formData.date), // Ensure date is in the correct format
        };
    
        console.log(eventData);
        try {
            const response = await fetch('http://localhost:3999/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventData),
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
                            value={formData.tickets[0].price}
                            onChange={(e) => {
                                const newTickets = [...formData.tickets];
                                newTickets[0].price = Number(e.target.value);
                                setFormData((prev) => ({
                                    ...prev,
                                    tickets: newTickets,
                                }));
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="ml-2">Kr.</span>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Plasser:</label>
                    <input
                        type="number"
                        id="totalSeats"
                        value={calculateTotalSeats()}
                        readOnly
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
                        value={new Date(formData.date).toISOString().split('T')[0]}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Antall billettyper:</label>
                    <input
                        type="number"
                        onChange={handleAddTickets}
                        min={1}
                        value={ticketTypes}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                {formData.tickets.map((ticket, index) => (
                    <div key={index} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Billettype {index + 1} Pris:</label>
                            <input
                                type="number"
                                value={ticket.price}
                                onChange={(e) => {
                                    const newTickets = [...formData.tickets];
                                    newTickets[index].price = Number(e.target.value);
                                    setFormData((prev) => ({
                                        ...prev,
                                        tickets: newTickets,
                                    }));
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Billettype {index + 1} Type:</label>
                            <input
                                type="text"
                                value={ticket.type}
                                onChange={(e) => {
                                    const newTickets = [...formData.tickets];
                                    newTickets[index].type = e.target.value;
                                    setFormData((prev) => ({
                                        ...prev,
                                        tickets: newTickets,
                                    }));
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Billettype {index + 1} Plasser:</label>
                            <input
                                type="number"
                                value={ticket.availableSeats}
                                onChange={(e) => {
                                    const newTickets = [...formData.tickets];
                                    newTickets[index].availableSeats = Number(e.target.value);
                                    setFormData((prev) => ({
                                        ...prev,
                                        tickets: newTickets,
                                    }));
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                ))}
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