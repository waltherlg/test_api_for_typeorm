import { Injectable } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { Users } from "./user.entity";
import { PlayerStatistic } from "./statistic.entity";

import { validate as isValidUUID } from 'uuid';
import { Profile } from "./profile.entity";


@Injectable()
export class AppRepository {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(PlayerStatistic)
    private readonly playerStatisticRepository: Repository<PlayerStatistic>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectDataSource() protected dataSource: DataSource,
    
  ) {}

  async createUser(login: string){
    const user = new Users(
        login,
        new Date    
    )
  
    const resultUser = await this.userRepository.save(user)
    //console.log(resultUser);
    
    const statistic = new PlayerStatistic(
        resultUser.userId,
        0
    )
    //console.log(statistic);
    const resultStatistic = await this.playerStatisticRepository.save(statistic)
    const profile = new Profile(
      'data',
      resultStatistic.playerStatisticId
    )
    const resultProfile = await this.profileRepository.save(profile)
    return resultUser.userId
  }
  
  async getUserById(userId){
    if(!isValidUUID(userId)){
      return null
    }
    const result = await this.userRepository.findOne({
      where: {
        userId: userId,
      },
      relations: ['PlayerStatistic.Profile']
  })  
    return result
  }

  async deleteAll(){
    try {
    await this.dataSource.query(`
    DELETE FROM public."Users";
    DELETE FROM public."PlayerStatistic";
      `)
      return true
    } catch (error) {
      console.log(error);
    }
  }

  async updateUserProfile(userId, profile){
    if(!isValidUUID(userId)){
      return null
    }
    const user = await this.userRepository.findOne({
      where: {
        userId: userId,
      },
  })
  user.PlayerStatistic.Profile.someData = profile
await this.userRepository.save(user)
return true
  }

  async deleteUserById(userId){
    const result = await this.userRepository.delete(userId)
    return result
  }
}