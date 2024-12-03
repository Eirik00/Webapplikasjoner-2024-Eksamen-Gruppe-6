"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { Mal } from '@/types/types';

const OpprettMalPage = () => {
  const router = useRouter();
  const [selectedWeekdays, setSelectedWeekdays] = useState<string[]>([]);
  const [formData, setFormData] = useState<Mal>({
    id: uuidv4(),
    title: '',
    eventOnSameDay: false,
    selectedWeekdays: [],
    lockedPrice: false,
    price: 0,
    limitedAvailability: false,
    availableSeats: 0,
    waitingList: false,
    private: false,
  });

  const handleWeekdayChange = (weekday: string) => {
    if (selectedWeekdays.includes(weekday)) {
      setSelectedWeekdays(selectedWeekdays.filter((day) => day !== weekday));
    } else {
      setSelectedWeekdays([...selectedWeekdays, weekday]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      selectedWeekdays,
    };

    try {
      const response = await fetch('http://localhost:3999/mals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFormData),
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Opprett Mal</h1>
      <form onSubmit={handleSubmit} className="max-w-lg space-y-4">
        <div>
          <label htmlFor="title" className="block mb-2 font-medium">
            Navn på mal:
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Skriv inn mal navn"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Tillat arrangementer på samme dag?
          </label>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="eventOnSameDay"
              checked={formData.eventOnSameDay}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="eventOnSameDay">Ja</label>
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Hvilke Dager?
          </label>
          <div className="flex flex-col space-y-2">
            {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
              <div key={day} className="flex items-center">
                <input
                  type="checkbox"
                  id={day}
                  checked={selectedWeekdays.includes(day)}
                  onChange={() => handleWeekdayChange(day)}
                  className="mr-2"
                />
                <label htmlFor={day}>{day.charAt(0).toUpperCase() + day.slice(1)}</label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="lockedPrice" className="block mb-2 font-medium">
            Fast pris?
          </label>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="lockedPrice"
              checked={formData.lockedPrice}
              onChange={handleChange}
              className="mr-2"
            />
            <input
              type="number"
              id="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="299"
            />
            <span className="ml-2">Kr.</span>
          </div>
        </div>

        <div>
          <label htmlFor="limitedAvailability" className="block mb-2 font-medium">
            Begrenset antall plasser?
          </label>
          <input
              type="checkbox"
              id="limitedAvailability"
              checked={formData.limitedAvailability}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="availableSeats" className="block mb-2 font-medium">
              Antall plasser:
            </label>
          <input
            type="number"
            id="availableSeats"
            value={formData.availableSeats}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="20"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="waitingList"
            checked={formData.waitingList}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="waitingList" className="font-medium">
            Venteliste?
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="private"
            checked={formData.private}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="private" className="font-medium">
            Privat?
          </label>
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
          Lagre Mal
        </button>
      </form>
    </div>
  );
};

export default OpprettMalPage;