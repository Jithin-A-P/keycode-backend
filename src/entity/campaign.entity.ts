import { Entity, PrimaryGeneratedColumn, Column, ManyToMany,ManyToOne } from "typeorm";
import KioskTimeSlot from "./kioskTimeslot.entity";
import Media from "./media.entity";


@Entity()
class Campaign {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  duration: number;

  @Column()
  frequency: number;

  @ManyToOne(() => Media, (media) => media.campaigns)
  media: Media;

  @ManyToMany(() => KioskTimeSlot, (timeSlot) => timeSlot.campaigns,)
  timeslots: KioskTimeSlot[];
}

export default Campaign;
