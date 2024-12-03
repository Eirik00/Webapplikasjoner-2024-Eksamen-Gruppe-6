export type Success<T> = {
  success: true;
  data: T;
};

export type Failure = {
  success: false;
  error: {
    code: string;
    message: string;
  };
};

export type Result<T> = Success<T> | Failure;


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