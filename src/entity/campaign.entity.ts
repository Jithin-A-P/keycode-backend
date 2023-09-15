import { Entity, PrimaryGeneratedColumn, Column, ManyToMany,ManyToOne ,  JoinTable} from "typeorm";
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
  
  @Column()
  mediaId: number;

  @ManyToOne(() => Media, (media) => media.campaigns,{ eager: true })
  @JoinTable({name:'mediaId'})
  media: Media;

  @ManyToMany(() => KioskTimeSlot, (timeSlot) => timeSlot.campaigns,{ eager: true })
  @JoinTable()
  timeSlots: KioskTimeSlot[];
}

export default Campaign;
