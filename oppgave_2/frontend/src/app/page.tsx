"use client";
import EventList from '@/components/EventList';
import { Events } from '@/types/types';
import { useEffect, useState } from 'react';


export default function Home() {
  const [admin, setAdmin] = useState<boolean>(true); // Må legge til admin funksjon
  const [events, setEvents] = useState<Events[]>([]);

  const fetchEvents = async () => {
    const res = await fetch('http://localhost:3999/events');
    const data = await res.json();
    setEvents(data);
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6">Arrangementer</h1>
      <EventList events={events} admin={admin} />
    </div>
  )
}