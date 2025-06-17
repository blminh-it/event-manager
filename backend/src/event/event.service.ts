import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from 'src/common/entity/event.entity';
import { Repository } from 'typeorm';
import { CreateEventDto, UpdateEventDto } from './dto/event.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}
  
  async findAllEvents(): Promise<Event[]> {
    return [
      {
        id: 1,
        title: 'Sample Event',
        description: 'This is a sample event description.',
        date: new Date(),
        location: 'Sample Location',
        totalTickets: 100,
        price: 50,
        tickets: [],
      },
      {
        id: 2,
        title: 'Another Event',
        description: 'This is another event description.',
        date: new Date(),
        location: 'Another Location',
        totalTickets: 200,
        price: 75,
        tickets: [],
      },
      {
        id: 3,
        title: 'Third Event',
        description: 'This is the third event description.',
        date: new Date(),
        location: 'Third Location',
        totalTickets: 150,
        price: 60,
        tickets: [],
      },
    ];
  }

  async findEventById(id: number): Promise<Event> {
    return this.eventRepository.findOne({ where: { id } });
  }

  async createEvent(data: CreateEventDto): Promise<Event> {
    const event = this.eventRepository.create(data);
    return this.eventRepository.save(event);
  }
  
  async updateEvent(id: number, data: UpdateEventDto): Promise<Event> {
    await this.eventRepository.update(id, data);
    return this.eventRepository.findOne({ where: { id } });
  }
  
  async deleteEvent(id: number): Promise<void> {
    await this.eventRepository.delete(id);
  }
}
