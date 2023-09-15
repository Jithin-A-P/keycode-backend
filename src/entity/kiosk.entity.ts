import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { KioskTimeSlot } from "./kioskTimeslot.entity";

@Entity()
export class Kiosk {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  dimensions: string;

  @Column()
  location: string;

  @Column()
  city: string;

  @Column({ type: "json" })
  tags: string[];

  @OneToMany(() => KioskTimeSlot, (timeSlot) => timeSlot.kiosk)
  timeslots: KioskTimeSlot[];
}