import Link from 'next/link'

const events = [
  {
    id: 'concert-2024',
    title: 'Summer Music Festival',
    date: '2024-07-15',
    venue: 'City Stadium'
  },
  // Add more events
];

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6">Upcoming Events</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <Link 
            key={event.id} 
            href={`/event/${event.id}`} 
            className="border p-4 hover:bg-gray-100 transition"
          >
            <h2 className="text-2xl font-semibold">{event.title}</h2>
            <p>Date: {event.date}</p>
            <p>Venue: {event.venue}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}