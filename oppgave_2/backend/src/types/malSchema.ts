import { z } from "zod";

export const MalSchema = z.object({
  id: z.string(),
  title: z.string(),
  eventOnSameDay: z.boolean(),
  selectedWeekdays: z.array(z.string()),
  lockedPrice: z.boolean(),
  price: z.number(),
  limitedAvailability: z.boolean(),
  availableSeats: z.number(),
  waitingList: z.boolean(),
  private: z.boolean(),
});

export type Mal = z.infer<typeof MalSchema>;