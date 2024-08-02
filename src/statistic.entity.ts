import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./user.entity";
import { Profile } from "./profile.entity";

export class PlayerStatisticDto{
    constructor(
        public userId: string,
        public sumScore: number
    ){}
}

@Entity({name: 'PlayerStatistic'})
export class PlayerStatistic extends PlayerStatisticDto {
    @PrimaryGeneratedColumn('uuid')
    playerStatisticId: string;
    @OneToOne(() => Users, (u) => u.PlayerStatistic, { onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({name: 'userId'})
    Users: Users   
    @Column('uuid')
    userId: string;
    @Column()
    sumScore: number;
    //@OneToOne(() => Profile, (p) => p.PlayerStatistic, { eager: true, nullable: true })
    @OneToOne(() => Profile, (p) => p.PlayerStatistic, { nullable: true })
    Profile: Profile | null
}