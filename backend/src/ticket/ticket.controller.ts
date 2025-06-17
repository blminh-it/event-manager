import { Controller, Get } from '@nestjs/common';
import { TicketService } from './ticket.service';

@Controller('tickets')
export class TicketController {
  constructor(private ticketService: TicketService) {}

  // @Post()
  // async createTicket() {
  //   const ticketData = {
  //     title: 'Sample Ticket',
  //     description: 'This is a sample ticket description',
  //     status: 'open ',
  //     user: { id: 1 }, // Assuming user with ID 1 exists
  //   };
  //   return this.ticketService.create(ticketData);
  // }

  @Get()
  async findAll() {
    return this.ticketService.findAll();
  }

  @Get(':id')
  async findById(id: string) {
    return this.ticketService.findById(+id);
  }
  
  @Get('user/:userId')
  async findByUserId(userId: string) {
    return this.ticketService.findByUserId(+userId);
  }
  
  @Get('status/:status')
  async findByStatus(status: string) {
    return this.ticketService.findByStatus(status);
  }
}
