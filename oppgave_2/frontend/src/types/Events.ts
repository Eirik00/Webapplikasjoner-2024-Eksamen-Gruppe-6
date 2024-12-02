export interface Events {
    id: string;
    title: string;
    date: Date;
    type: string;
    description: string;
    location: string;
    ticket: {
      price: number;
      type: string;
      availableSeats: number;
    };
}