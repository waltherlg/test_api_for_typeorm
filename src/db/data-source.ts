import { DataSource } from "typeorm";
import { Users } from "../user.entity";
import { PlayerStatistic } from "../statistic.entity";
import { Profile } from "../profile.entity";

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'nest',
  password: 'nest',
  database: 'test_typeorm',
  synchronize: false,
  entities: [
    Users,
    PlayerStatistic,
    Profile,
  ],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  migrationsTableName: 'custom_migration_table',
});
