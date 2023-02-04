import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./role.dto";

@Controller("roles")
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.rolesService.createRole(dto);
  }

  @Get(":value")
  findOne(@Param("value") value: string) {
    return this.rolesService.findRole(value);
  }
}
