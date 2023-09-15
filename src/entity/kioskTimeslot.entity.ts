import { Entity, PrimaryGeneratedColumn, Column, ManyToMany,ManyToOne } from "typeorm";
import Kiosk from "./kiosk.entity";
import Campaign from "./campaign.entity";

@Entity()
class KioskTimeSlot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  time: number;

  @Column({ type: "decimal" })
  pricePerSecond: number;

  @Column()
  avgViewCount: number;

  @Column()
  liveViewCount: number;

  @Column()
  kioskId: string;

  @ManyToOne(() => Kiosk, (kiosk) => kiosk.timeslots)
  kiosk: Kiosk;

  @ManyToMany(() => Campaign, (campaign) => campaign.timeSlots,{lazy:true})
  campaigns:Campaign[]
}

export default KioskTimeSlot;
