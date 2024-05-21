import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { AppRepository } from './app.repository';
import { IsString, Length } from 'class-validator';
import fs from 'node:fs';
import path from 'node:path'
import { readTextFileAsync } from './helpers';

export class UserLoginInput {
  @IsString()
  @Length(3, 20)
  login: string;
}

export class ProfileUpdateData {
  @IsString()
  @Length(3, 20)
  data: string;
}

@Controller('test')
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly appRepository: AppRepository
  ) {}

  @Get('avatar')
  async getAvatar(){
    const htmlContent = await readTextFileAsync(path.join('views', 'avatar-change-page.html'))

    return htmlContent  
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('user')
  async createUser(@Body() login: UserLoginInput){
    const result = await this.appRepository.createUser(login.login)
    return result
  }

  @Get('user/:userId')
  async getLastCreatedUser(@Param('userId')userId){
    const result = await this.appRepository.getUserById(userId)
    return result
  }

  @Post('create_and_get_user')
  async createAndGetUser(@Body() login: UserLoginInput){
    const result = await this.appService.createUserAndReturnCreated(login.login)
    console.log(result);
    
    return result
  }

  @Delete('delete_all')
  async deleteAllData(){
    const result = await this.appRepository.deleteAll()
  }

  @Put('upadeprofile/:userId')
  async updateProfile(@Body() profile: ProfileUpdateData, @Param('userId') userId){
    const result = await this.appRepository.updateUserProfile(userId, profile.data)
  }

  @Delete('delete_user/:userId')
  async deleteUserById(@Param('userId') userId){
    const result = await this.appRepository.deleteUserById(userId)
    return result
  }

}
