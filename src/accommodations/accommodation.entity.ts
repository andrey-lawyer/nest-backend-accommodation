import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Accommodation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  photo: string;

  @Column()
  accommodation: string;

  @Column()
  description: string;

  @Column()
  cost: string;

  @Column()
  phone: string;

  @Column()
  latitude: string;

  @Column()
  longitude: string;

  @Column()
  place: string;
}
