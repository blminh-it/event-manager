export class CreateEventDto {
  title: string;
  description: string;
  location: string;
  date: Date;
  totalTickets: number;
  price: number;
}

export class UpdateEventDto {
  title?: string;
  description?: string;
  location?: string;
  date?: Date;
  totalTickets?: number;
  price?: number;
}
