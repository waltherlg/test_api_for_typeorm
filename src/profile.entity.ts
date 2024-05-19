import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PlayerStatistic } from "./statistic.entity";

export class ProfileDto {
    constructor(
        public someData: string,
        public playerStatisticId: string,
    ){}
}

@Entity('Profile')
export class Profile extends ProfileDto {
    @PrimaryGeneratedColumn('uuid')
    profileId: string;
    @Column()
    someData: string;
    @OneToOne(() => PlayerStatistic, (p) => p.Profile, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({name: 'playerStatisticId'})
    PlayerStatistic: PlayerStatistic
    @Column()
    playerStatisticId: string
}