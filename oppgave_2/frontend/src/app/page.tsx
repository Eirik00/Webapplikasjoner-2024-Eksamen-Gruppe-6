"use client";
import EventList from '@/components/EventList';
import GroupedEvents from '@/components/GroupedEvents';
import { Events } from '@/types/types';
import { useEffect, useState } from 'react';

export default function Home() {
  const [admin, setAdmin] = useState<boolean>(true); // Må legge til admin funksjon
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
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6">Arrangementer</h1>
      <input 
        type="text" 
        placeholder="Filter by type" 
        value={filter} 
        onChange={handleFilterChange} 
        className="mb-4 p-2 border border-gray-300"
      />
      <GroupedEvents events={filteredEvents} />
    </div>
  )
}