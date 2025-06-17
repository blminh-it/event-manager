import type { Ticket } from './ticket';

export type User = {
  id: number;
  name: string;
  email: string;

  tickets: Ticket[];
}
