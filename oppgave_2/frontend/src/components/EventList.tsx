import { Events } from "@/types/types";
import Link from "next/link";

interface EventListProps {
    events: Events[];
    admin: boolean;
}

export default function EventList({ events, admin }: EventListProps){

    const handleClick = async (eventid: string) => {
        const res = await fetch(`http://localhost:3999/events/${eventid}`, {
            method: 'DELETE'
        })

        if(res.ok){
            alert('Arrangementet ble slettet');
            location.reload();
        } else {
            alert('Noe gikk galt');
        }
    }

    return(
        <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-4">
            {events.map((event: Events) => (
                <article
                key={event.id} 
                className="border p-4 hover:bg-gray-100 transition text-center">
                    <Link 
                        href={admin ? `/endre-arrangement/${event.id}` : `/event/${event.id}`}
                    >
                        <h2 className="text-2xl font-semibold">{event.title}</h2>
                        <p>{event.type}</p>
                        <p>{event.tickets[0].price}.-</p>
                        <p>{event.location}</p>
                        <p>Ledige plasser: {
                            event.tickets.reduce((total, ticket) => total + ticket.availableSeats, 0)
                        }</p>
                    </Link>
                    <button
                        className={`p-2 bg-red-500 text-white rounded-md mt-4 ${admin ? 'block ml-auto' : 'hidden'}`}
                        onClick={() => handleClick(event.id)}
                    >Slett Arrangement</button>
                </article>
            ))}
        </div>
    )
}