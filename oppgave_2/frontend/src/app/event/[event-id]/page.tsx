import { notFound } from 'next/navigation'

// Koden var ai generet men jobbet videre på den

interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  venue: string;
  tickets: {
    price: number;
    type: string;
    availableSeats: number;
  }[];
}

// Mock data - in real app, this would come from a database
const events: Record<string, Event> = {
  'concert-2024': {
    id: 'concert-2024',
    title: 'Summer Music Festival',
    description: 'An epic night of live music',
    date: new Date('2024-07-15'),
    venue: 'City Stadium',
    tickets: [
      { price: 50, type: 'General Admission', availableSeats: 1000 },
      { price: 100, type: 'VIP', availableSeats: 200 }
    ]
  }
};

export default function EventPage({ params }: { params: { "event-id": string } }) {
  const event = events[params["event-id"]];

  if (!event) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
      <p>{event.description}</p>
      <div className="mt-4">
        <p>Date: {event.date.toLocaleDateString()}</p>
        <p>Venue: {event.venue}</p>
        
        <h2 className="text-2xl mt-4">Tickets</h2>
        {event.tickets.map((ticket, index) => (
          <div key={index} className="border p-2 mt-2">
            <p>{ticket.type}</p>
            <p>Price: ${ticket.price}</p>
            <p>Available Seats: {ticket.availableSeats}</p>
            <button className="bg-blue-500 text-white px-4 py-2 mt-2">
              Buy Ticket
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}