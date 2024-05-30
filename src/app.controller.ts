import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { AppRepository } from './app.repository';
import { IsString, Length } from 'class-validator';
import fs, { existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path'
import { ensureDirSinc, readTextFileAsync, saveFileAsync } from './helpers';
import { FileInterceptor } from '@nestjs/platform-express';

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
    const htmlContent = await readTextFileAsync(join('views', 'avatar-change-page.html'))

    return htmlContent  
  }

  @Post('post-avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  async updateAvatar(@UploadedFile() avatarFile: Express.Multer.File){
    const dirPath = join('content', 'users', '10')
    ensureDirSinc(dirPath)

    console.log(avatarFile);
    const safeFilename = Buffer.from(avatarFile.originalname, 'binary').toString('utf8');
    await saveFileAsync(join(dirPath, safeFilename), avatarFile.buffer )
    return 'avatar apdated'
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
