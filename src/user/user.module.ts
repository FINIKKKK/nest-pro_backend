import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./user.model";
import { UserRoles } from "src/roles/user_roles.model";
import { Role } from "src/roles/role.model";
import { RolesModule } from "src/roles/roles.module";

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [SequelizeModule.forFeature([User, Role, UserRoles]), RolesModule],
})
export class UserModule {}
