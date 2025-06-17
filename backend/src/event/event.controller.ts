import { Controller, Get, Post } from '@nestjs/common';
import { CreateEventDto } from './dto/event.dto';
import { EventService } from './event.service';

@Controller('events')
export class EventController {
  constructor(
    private readonly eventService: EventService,
  ) {}

  @Get()
  async findAll() {
    return this.eventService.findAllEvents();
  }
  
  @Get(':id')
  async findById(id: string) {
    return this.eventService.findEventById(+id);
  }
  
  @Post()
  async createEvent() {
    const eventData = new CreateEventDto();
    eventData.title = 'Sample Event';
    eventData.date = new Date();
    eventData.location = 'Sample Location';
    eventData.description = 'This is a sample event description';
    eventData.totalTickets = 100;
    eventData.price = 20;
    return this.eventService.createEvent(eventData);
  }
}
