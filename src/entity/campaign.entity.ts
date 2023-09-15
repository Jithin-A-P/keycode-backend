import { Entity, PrimaryGeneratedColumn, Column, ManyToMany,ManyToOne ,  JoinTable} from "typeorm";
import KioskTimeSlot from "./kioskTimeslot.entity";
import Media from "./media.entity";


@Entity()
class Campaign {
  @PrimaryGeneratedColumn()
  id: number;

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

  @Column()
  totalPrice: number;

  @Column()
  status: string;

  @Column()
  totalViews: number=0;

  @Column()
  kiosksCount: number;

  @ManyToOne(() => Media, (media) => media.campaigns,{ lazy: true })
  @JoinTable({name:'mediaId'})
  media: Media;

  @ManyToMany(() => KioskTimeSlot, (timeSlot) => timeSlot.campaigns,{ lazy: true })
  @JoinTable()
  timeSlots: KioskTimeSlot[];
}

export default Campaign;
