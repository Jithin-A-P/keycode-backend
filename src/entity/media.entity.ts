import { Entity, PrimaryGeneratedColumn, Column ,OneToMany} from 'typeorm';
import Campaign from "./campaign.entity"

@Entity()
class Media {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  url: string;

  @OneToMany(() => Campaign, (campaign) => campaign.media, { cascade: true, lazy:true })
  campaigns: Campaign[];
}

export default Media;
