import type { Ticket } from './ticket';

export type Event = {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  totalTickets: number;
  price: number;

  tickets: Ticket[];
}
