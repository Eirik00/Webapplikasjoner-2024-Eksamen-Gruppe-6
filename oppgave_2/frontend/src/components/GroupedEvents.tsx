import React from 'react';
import { Events } from '@/types/types';
import EventList from './EventList';

interface GroupedEventsProps {
  events: Events[];
  admin: boolean;
}

function groupEventsByYearAndMonth(events: Events[]) {
    const groupedEvents: { [year: string]: { [month: string]: Events[] } } = {};
  
    events.forEach(event => {
      const eventDate = new Date(event.date);
      const year = eventDate.getFullYear().toString();
      const month = eventDate.toLocaleString('default', { month: 'long' });
  
      if (!groupedEvents[year]) {
        groupedEvents[year] = {};
      }
  
      if (!groupedEvents[year][month]) {
        groupedEvents[year][month] = [];
      }
  
      groupedEvents[year][month].push(event);
    });
  
    return groupedEvents;
}

const GroupedEvents: React.FC<GroupedEventsProps> = ({ events, admin }) => {
  const groupedEvents = groupEventsByYearAndMonth(events);

  return (
    <div>
      {Object.keys(groupedEvents).map(year => (
        <div key={year}>
          <h2 className="text-2xl font-bold mt-4">{`Arrangementer ${year}`}</h2>
          {Object.keys(groupedEvents[year]).map(month => (
            <div key={month}>
              <h3 className="text-xl font-semibold mt-2">{month}:</h3>
              <EventList events={groupedEvents[year][month]} admin={admin} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GroupedEvents;