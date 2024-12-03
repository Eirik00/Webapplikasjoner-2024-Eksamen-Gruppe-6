import { Events } from "@/types/types";
import Link from "next/link";

interface EventListProps {
    events: Events[];
    admin?: boolean;
}

export default function EventList({ events, admin }: EventListProps){

    return(
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event: Events) => (
                <Link 
                    key={event.id} 
                    href={admin ? `/endre-arrangement/${event.id}` : `/event/${event.id}`} 
                    className="border p-4 hover:bg-gray-100 transition text-center"
                    >
                    <h2 className="text-2xl font-semibold">{event.title}</h2>
                    <p>{event.type}</p>
                    <p>{event.tickets[0].price}.-</p>
                    <p>{event.location}</p>
                    <p>Ledige plasser: {
                        event.tickets.reduce((total, ticket) => total + ticket.availableSeats, 0) // Ai generert kode
                        }</p>
                </Link>
            ))}
        </div>
    )
}