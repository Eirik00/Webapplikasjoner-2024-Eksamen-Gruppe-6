import { Hono } from "hono";
import { cors } from "hono/cors";
import { z } from "zod";
import { Event, EventSchema, Person, PersonSchema } from "./types/eventSchema";
import { Mal, MalSchema } from "./types/malSchema";

const app = new Hono();
const eventList: Event[] = [];
const malList: Mal[] = [];

app.use("/*", cors());

app.onError((err, c) => {
  console.error(err);
  return c.json(
    {
      error: {
        message: err.message,
      },
    },
    { status: 500 }
  );
});

app.get("/events", (c) => {
  return c.json<Event[]>(eventList);
});

app.get("/events/:id", (c) => {
  const id = c.req.param("id");
  const event = eventList.find((event) => event.id === id);

  if (!event) {
    return c.json({ error: "Event not found" }, { status: 404 });
  }

  return c.json<Event>(event);
});

app.post("/events", async (c) => {
  try {
    const newEventData: Event = await c.req.json();
    
    // Initialize the person field as an empty array
    const event = EventSchema.parse({
      ...newEventData,
      date: new Date(newEventData.date),
      tickets: newEventData.tickets.map((ticket) => ({
        ...ticket,
        person: [],
      })),
    });
    eventList.push(event);

    return c.json<Event>(event, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ 
        error: "Invalid event data", 
        details: error.errors 
      }, { status: 400 });
    }
    throw error;
  }
});

app.put("/events/:id", async (c) => {
  const id = c.req.param("id");
  const updatedEventData = await c.req.json();

  const eventIndex = eventList.findIndex((event) => event.id === id);
  
  if (eventIndex === -1) {
    return c.json({ error: "Event not found" }, { status: 404 });
  }

  try {
    const updatedEvent = {
      ...eventList[eventIndex],
      ...updatedEventData,
      date: new Date(updatedEventData.date),
    };

    const validatedEvent = EventSchema.parse(updatedEvent);
    eventList[eventIndex] = validatedEvent;

    return c.json<Event>(validatedEvent);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ 
        error: "Invalid event data", 
        details: error.errors 
      }, { status: 400 });
    }
    throw error;
  }
});

app.delete("/events/:id", (c) => {
  const id = c.req.param("id");
  const eventIndex = eventList.findIndex((event) => event.id === id);

  if (eventIndex === -1) {
    return c.json({ error: "Event not found" }, { status: 404 });
  }

  eventList.splice(eventIndex, 1);
  return c.json({ message: "Event deleted successfully" });
});

app.post("/events/:id/join/:ticketid", async (c) => {
  const id = c.req.param("id");
  const ticketId = c.req.param("ticketid");
  const personDataList = await c.req.json();

  const eventIndex = eventList.findIndex((event) => event.id === id);
  
  if (eventIndex === -1) {
    return c.json({ error: "Event not found" }, { status: 404 });
  }

  try {
    const validPersons = personDataList.map((personData: Person) => PersonSchema.parse(personData));

    const event = eventList[eventIndex];
    var totalSeatsRequested = validPersons.length;
    const availableTickets = event.tickets.reduce((total, ticket) => total + ticket.availableSeats, 0);

    if (totalSeatsRequested > availableTickets) {
      return c.json({ error: "No available seats" }, { status: 400 });
    }

    eventList[eventIndex] = {
      ...event,
      tickets: event.tickets.map(ticket => {
      if (ticket.type === ticketId) {
        return {
        ...ticket,
        availableSeats: ticket.availableSeats - totalSeatsRequested,
        person: [...ticket.person, ...validPersons],
        };
      }
      return ticket;
      }),
    };

    return c.json(eventList[eventIndex]);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ 
        error: "Invalid person data", 
        details: error.errors 
      }, { status: 400 });
    }
    throw error;
  }
});

app.get("/mals", (c) => {
  return c.json<Mal[]>(malList);
});

app.post("/mals", async (c) => {
  try {
    const newMalData = await c.req.json();
    const mal = MalSchema.parse(newMalData);
    malList.push(mal);
    return c.json<Mal>(mal, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ 
        error: "Invalid mal data", 
        details: error.errors 
      }, { status: 400 });
    }
    throw error;
  }
});

export default app;