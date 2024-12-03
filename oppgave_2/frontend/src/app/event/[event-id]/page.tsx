"use client";

import { notFound } from 'next/navigation'
import { Events } from '@/types/types'
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Koden var ai generet men vi jobbet videre på den


export default function EventPage({ params }: { params: { "event-id": string } }) {
  const [loading, setLoading] = useState(true); // ai generert kode
  const [event, setEvent] = useState<Events>({
    id: "",
    title: "",
    date: new Date(),
    type: "",
    description: "",
    location: "",
    tickets: []
  });


  

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`http://localhost:3999/events/${params["event-id"]}`);
        if (!res.ok) {
          notFound();
        }
        const data = await res.json();
        setEvent(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // ai generert kode
      }
    }

    fetchEvent();
    console.log(event);
  }, [params]);


  if (!loading && !event) {
    notFound();
  }

  if (loading) {
    return <p>Laster...</p>; // Chatgpt clutcha
  }

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
      <p>Tidspunkt: {new Date(event.date).toLocaleDateString()}</p>
      <p>Type: {event.type}</p>
      <div className="mt-4">
        <p>Beskrivelse: {event.description}</p>
        <p>Lokasjon: {event.location}</p>
        <div>
          <h3>Billetter:</h3>
          <div className="w-full flex justify-center space-x-4">
          {event.tickets?.map((ticket, index) => (
            <div key={index} className="max-w-md border p-4 mt-4">
              <div className="flex flex-col items-center justify-around ">
                <p>{ticket.type}</p>
                <div>
                  <p className="block">Pris: {ticket.price} kr</p>
                  <p className="block ml-2">Tilgjengelige seter: {ticket.availableSeats}</p>
                </div>
              </div>
              <div className="mt-4">
                <Link href={`${event.id}/form`} className="bg-blue-500 text-white px-4 py-2">
                  Meld på
                </Link>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  )
}