"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const OpprettMalPage = () => {
  const router = useRouter();
  const [selectedWeekdays, setSelectedWeekdays] = useState<string[]>([]);

  const handleWeekdayChange = (weekday: string) => {
    if (selectedWeekdays.includes(weekday)) {
      setSelectedWeekdays(selectedWeekdays.filter((day) => day !== weekday));
    } else {
      setSelectedWeekdays([...selectedWeekdays, weekday]);
    }
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Logikk for å opprette mal
    router.push('/opprett-arrangement');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Opprett Mal</h1>
      <form onSubmit={handleSubmit} className="max-w-lg space-y-4">
        <div>
          <label htmlFor="name" className="block mb-2 font-medium">
            Navn på mal:
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Skriv inn mal navn"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Tillat arrangementer på samme dag?
          </label>
          <div className="flex items-center">
            <input type="checkbox" id="same-day" className="mr-2" />
            <label htmlFor="same-day">Ja</label>
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Hvilke Dager?
          </label>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="monday"
                checked={selectedWeekdays.includes('monday')}
                onChange={() => handleWeekdayChange('monday')}
                className="mr-2"
              />
              <label htmlFor="monday">Mandag</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="tuesday"
                checked={selectedWeekdays.includes('tuesday')}
                onChange={() => handleWeekdayChange('tuesday')}
                className="mr-2"
              />
              <label htmlFor="tuesday">Tirsdag</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="wednesday"
                checked={selectedWeekdays.includes('wednesday')}
                onChange={() => handleWeekdayChange('wednesday')}
                className="mr-2"
              />
              <label htmlFor="wednesday">Onsdag</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="thursday"
                checked={selectedWeekdays.includes('thursday')}
                onChange={() => handleWeekdayChange('thursday')}
                className="mr-2"
              />
              <label htmlFor="thursday">Torsdag</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="friday"
                checked={selectedWeekdays.includes('friday')}
                onChange={() => handleWeekdayChange('friday')}
                className="mr-2"
              />
              <label htmlFor="friday">Fredag</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="saturday"
                checked={selectedWeekdays.includes('saturday')}
                onChange={() => handleWeekdayChange('saturday')}
                className="mr-2"
              />
              <label htmlFor="saturday">Lørdag</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="sunday"
                checked={selectedWeekdays.includes('sunday')}
                onChange={() => handleWeekdayChange('sunday')}
                className="mr-2"
              />
              <label htmlFor="sunday">Søndag</label>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="price" className="block mb-2 font-medium">
            Fast pris?
          </label>
          <div className="flex items-center">
            <input type="checkbox" id="price" className="mr-2" />
            <input
              type="number"
              id="price"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="299"
            />
            <span className="ml-2">Kr.</span>
          </div>
        </div>

        <div>
          <label htmlFor="plasser" className="block mb-2 font-medium">
            Begrenset antall plasser?
          </label>
          <input
            type="number"
            id="plasser"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="20"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input type="checkbox" id="ventelist" className="mr-2" />
          <label htmlFor="ventelist" className="font-medium">
            Venteliste?
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <input type="checkbox" id="privat" className="mr-2" />
          <label htmlFor="privat" className="font-medium">
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

