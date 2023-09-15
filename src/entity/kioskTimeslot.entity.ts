import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import Kiosk from "./kiosk.entity";

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
}

export default KioskTimeSlot;
