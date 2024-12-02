import EventList from '@/components/EventList';
import { Events } from '@/types/Events';
import Link from 'next/link'

const events: Events[] = [
  {
    id: 'concert-2024',
    title: 'Summer Music Festival',
    date: new Date('2024-07-15'),
    type: 'Konsert',
    description: 'An epic night of live music',
    location: 'Halden',
    tickets: [
      { price: 50, type: 'General Admission', availableSeats: 1000 },
      { price: 100, type: 'VIP', availableSeats: 200 }
    ]
  },
];

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-5xl p-4 font-bold mb-6 text-center">Arrangementer</h1>
      <EventList events={events} />
    </div>
  )
}