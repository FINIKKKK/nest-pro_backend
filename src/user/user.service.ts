import {
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { RolesService } from "src/roles/roles.service";
import { AddRoleDto } from "./add-role.dto";
import { BanUserDto } from "./ban-user.dto";
import { CreateUserDto } from "./user.dto";
import { User } from "./user.model";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private readonly rolesService: RolesService
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.rolesService.findRole("USER");
    await user.$set("roles", [role.id]);
    user.roles = [role];
    return user;
  }

  async getUser(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.rolesService.findRole(dto.value);

    if (user && role) {
      await user.$add("role", role.id);
      return dto;
    }
    throw new HttpException("Пользователь не найден", HttpStatus.NOT_FOUND);
  }

  async banUser(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId);

    if (!user) {
      throw new HttpException("Пользователь не найден", HttpStatus.NOT_FOUND);
    }

    user.banned = true;
    user.banReason = dto.banReason;
    user.save();
    return user;
  }
}
