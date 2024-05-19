import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './typeorm.config';
import { Users } from './user.entity';
import { PlayerStatistic } from './statistic.entity';
import { AppRepository } from './app.repository';
import { Profile } from './profile.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([
      Users,
      PlayerStatistic,
      Profile
    ])
  ],
  controllers: [AppController],
  providers: [AppService, AppRepository],
})
export class AppModule {}
