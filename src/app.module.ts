import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserModule } from "./user/user.module";
import { ConfigModule } from "@nestjs/config";
import { User } from "./user/user.model";
import { RolesModule } from './roles/roles.module';
import { Role } from "./roles/role.model";
import { UserRoles } from "./roles/user_roles.model";
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, UserRoles],
      autoLoadModels: true,
    }),
    UserModule,
    RolesModule,
    AuthModule,
  ],
})
export class AppModule {}
