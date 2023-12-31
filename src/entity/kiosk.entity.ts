import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import KioskTimeSlot from "./kioskTimeslot.entity";

@Entity()
class Kiosk {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  dimensions: string;

  @Column()
  location: string;

  @Column()
  city: string;

  @Column()
  latitude: string;

  @Column()
  longitude: string;

  @Column({ type: "json" })
  tags: string[];

  @OneToMany(() => KioskTimeSlot, (timeSlot) => timeSlot.kiosk, { cascade: true ,eager:true})
  timeslots: KioskTimeSlot[];
}

export default Kiosk;
