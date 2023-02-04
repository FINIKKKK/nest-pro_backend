import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateRoleDto } from "./role.dto";
import { Role } from "./role.model";

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private rolesRepository: typeof Role) {}

  async createRole(dto: CreateRoleDto) {
    const role = await this.rolesRepository.create(dto);
    return role;
  }

  async findRole(value: string) {
    const role = await this.rolesRepository.findOne({ where: { value } });
    return role;
  }
}
