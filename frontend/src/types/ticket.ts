import type { Event } from './event';
import type { User } from './user';

export type Ticket = {
  eventName: any;
  id: number;
  status: string;
  purchasedAt: string;
  price: number;

  event: Event;
  user: User;
}
