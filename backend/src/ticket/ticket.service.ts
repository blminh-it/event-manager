import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from 'src/common/entity/ticket.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
  ) { }

  // async create(data: Partial<Ticket>) {
  //   const ticket = this.ticketRepository.create(data);
  //   return this.ticketRepository.save(ticket);
  // }

  async findAll() {
    return [
      {
        id: 1,
        event: {
          id: 1,
          title: 'Sample Ticket 1',
          description: 'This is a sample ticket description.',
          date: new Date(),
          location: 'Sample Location',
          totalTickets: 100,
          price: 50,
          tickets: [],
        },
        userId: 1,
        status: 'available',
        price: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        event: {
          id: 2,
          title: 'Sample Ticket 2',
          description: 'This is a sample ticket description 2.',
          date: new Date(),
          location: 'Sample Location 2',
          totalTickets: 200,
          price: 75,
          tickets: [],
        },
        userId: 2,
        status: 'sold',
        price: 75,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        event: {
          id: 3,
          title: 'Sample Ticket 3',
          description: 'This is a sample ticket description 3.',
          date: new Date(),
          location: 'Sample Location 3',
          totalTickets: 300,
          price: 60,
          tickets: [],
        },
        userId: 3,
        status: 'available',
        price: 60,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  }

  async findById(id: number) {
    return this.ticketRepository.findOne({ where: { id } });
  }

  async update(id: number, data: Partial<Ticket>) {
    await this.ticketRepository.update(id, data);
    return this.findById(id);
  }

  async delete(id: number) {
    const ticket = await this.findById(id);
    if (!ticket) return null;
    await this.ticketRepository.delete(id);
    return ticket;
  }

  async findByUserId(userId: number) {
    return this.ticketRepository.find({ where: { user: { id: userId } } });
  }

  async findByStatus(status: string) {
    return this.ticketRepository.find({ where: { status } });
  }
}
