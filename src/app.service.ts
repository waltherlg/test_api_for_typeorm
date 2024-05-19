import { Injectable } from '@nestjs/common';
import { AppRepository } from './app.repository';

@Injectable()
export class AppService {
  constructor(
    private readonly appRepository: AppRepository
  ){}
  getHello(): string {
    return 'Hello World!';
  }


  async createUserAndReturnCreated(login: string){
    const userResult = await this.appRepository.createUser(login)
    const user = await this.appRepository.getUserById(userResult)
    return user

  }
}
