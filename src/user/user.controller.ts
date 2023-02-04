import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { RolesService } from "src/roles/roles.service";
import { CreateUserDto } from "./user.dto";
import { User } from "./user.model";
import { UserService } from "./user.service";

@ApiTags("Пользователи")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: "Создание пользователя" })
  @ApiResponse({ status: 200, type: User })
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @ApiOperation({ summary: "Получение одного пользователя" })
  @ApiResponse({ status: 200, type: User })
  @Get(":id")
  getOne(@Param("id") id: number) {
    return this.userService.getUser(id);
  }

  @ApiOperation({ summary: "Получение всех пользователей" })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }
}
