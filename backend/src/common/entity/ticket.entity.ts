import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Event } from './event.entity';
import { User } from './user.entity';

@Entity("tickets")
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'active' })
  status: string; // e.g., 'active', 'cancelled', 'expired'

  @CreateDateColumn()
  purchasedAt: Date;

  @ManyToOne(() => Event, (event) => event.tickets)
  event: Event;

  @ManyToOne(() => User, (user) => user.tickets)
  user: User;
}
