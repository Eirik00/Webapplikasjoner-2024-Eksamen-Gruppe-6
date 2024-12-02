import { notFound } from 'next/navigation'
import { Events } from '@/types/Events'

// Koden var ai generet men jobbet videre på den



// Mock data - in real app, this would come from a database
const events: Record<string, Events> = {
  'concert-2024': {
    id: 'concert-2024',
    title: 'Summer Music Festival',
    date: new Date('2024-07-15'),
    type: 'Konsert',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dui eros, bidendum vel bidendum ut, pretium in ipsum. quisque in phareta odio. nulla id venetatis libero. quisque in phareta odio. nulla id venetatis libero.',
    location: 'Halden',
    ticket:{ price: 50, type: 'General Admission', availableSeats: 1000 },
  },
};

export default function EventPage({ params }: { params: { "event-id": string } }) {
  const event = events[params["event-id"]];

  if (!event) {
    notFound();
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
          {event.tickets.map((ticket, index) => (
            <div key={index} className="border p-2 mt-2">
              <p>{ticket.type}</p>
              <p>Pris: {ticket.price} kr</p>
              <p>Tilgjengelige seter: {ticket.availableSeats}</p>
              <button className="bg-blue-500 text-white px-4 py-2 mt-2">
                Meld på
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}