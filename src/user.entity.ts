import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { PlayerStatistic } from "./statistic.entity";

class UserDto {
  constructor(
    public login: string,
    public createdAt: Date
  ){}
  
}

@Entity({ name: 'Users' })
export class Users extends UserDto {
  @PrimaryGeneratedColumn('uuid')
  userId: string;
  @Column({ unique: true })
  login: string;
  @Column()
  createdAt: Date
  @OneToOne(() => PlayerStatistic, (p) => p.Users)
  //@OneToOne(() => PlayerStatistic, (p) => p.Users, {eager: true})
  PlayerStatistic: PlayerStatistic | null;
}