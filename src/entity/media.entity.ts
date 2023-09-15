import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
class Media {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  type: string;

  @Column()
  url: string;
}

export default Media;
