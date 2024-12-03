"use client";
import GroupedEvents from '@/components/GroupedEvents';
import { Events } from '@/types/types';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useAdmin } from '@/contexts/AdminContext';

interface HomeProps {
  admin: boolean;
  setAdmin: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Home() {
  const { admin, setAdmin } = useAdmin();
  const [events, setEvents] = useState<Events[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Events[]>([]);
  const [filter, setFilter] = useState<string>('');

  const fetchEvents = async () => {
    const res = await fetch('http://localhost:3999/events');
    const data = await res.json();
    setEvents(data);
    setFilteredEvents(data);
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilter(value);
    filterEvents(value);
  }

  const filterEvents = (filterValue: string) => {
    const filtered = events.filter(event => 
      event.type.toLowerCase().includes(filterValue.toLowerCase())
    );
    setFilteredEvents(filtered);
  }

  return (
    <>
      <Head>
        <title>Arrangement Ordning</title>
        <meta name="description" content="En webapplikasjon for å arrangere arrangementer" />
      </Head>
      <div className="container mx-auto p-10">
        <h1 className="text-4xl font-bold mb-6 text-center">Arrangementer</h1>
        <input 
          type="text" 
          placeholder="Filter by type" 
          value={filter} 
          onChange={handleFilterChange} 
          className="mb-4 p-2 border border-gray-300"
        />
        <GroupedEvents events={filteredEvents} admin={admin}/>
        <button
          className={`p-2 mt-4 rounded  ${admin ? 'bg-red-500 hover:bg-red-700 text-white' : 'bg-green-500 text-black'}`}
          onClick={() => setAdmin(!admin)}
        >
          {admin ? "Skru av Admin" : "Skru på Admin"}
        </button>
      </div>
    </>
  )
}