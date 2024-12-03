import { z } from "zod";

export const PersonSchema = z.object({
    name: z.string(),
    telephone: z.string(),
});

export const EventSchema = z.object({
  id: z.string(),
  title: z.string(),
  date: z.date(),
  type: z.string(),
  description: z.string(),
  location: z.string(),
  tickets: z.array(
    z.object({
      price: z.number(),
      type: z.string(),
      availableSeats: z.number(),
    })
  ),
  person: z.array(
    PersonSchema
  ),
});

export type Event = z.infer<typeof EventSchema>;
export type Person = z.infer<typeof PersonSchema>;