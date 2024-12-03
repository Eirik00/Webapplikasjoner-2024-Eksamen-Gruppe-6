export interface Events {
  id: string;
  title: string;
  date: Date;
  type: string;
  description: string;
  location: string;
  tickets: {
    price: number;
    type: string;
    availableSeats: number;
  }[];
}

export interface Mal {
  id: string;
  title: string;
  eventOnSameDay: boolean;
  selectedWeekdays: string[];
  lockedPrice: boolean;
  price: number;
  limitedAvailability: boolean;
  availableSeats: number;
  waitingList: boolean;
  private: boolean;
}