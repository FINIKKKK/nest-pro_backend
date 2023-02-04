import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt/dist";
import { CreateUserDto } from "src/user/user.dto";
import { UserService } from "src/user/user.service";
import * as bcrypt from "bcryptjs";
import { User } from "src/user/user.model";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtSetvice: JwtService
  ) {}

  async login(dto: CreateUserDto) {
    const user = await this.validateUser(dto);
    return this.generateToken(user);
  }

  async register(dto: CreateUserDto) {
    const findUser = await this.usersService.getUserByEmail(dto.email);
    if (findUser) {
      throw new HttpException(
        "Пользователь с такой почтой существует",
        HttpStatus.BAD_REQUEST
      );
    }

    const hashPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.usersService.createUser({
      ...dto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { id: user.id, email: user.email, roles: user.roles };
    return {
      token: this.jwtSetvice.sign(payload),
    };
  }

  private async validateUser(dto: CreateUserDto) {
    const user = await this.usersService.getUserByEmail(dto.email);
    const password = await bcrypt.compare(dto.password, user.password);

    if (user && password) {
      return user;
    }
    throw new UnauthorizedException({ message: "Неверный логи или пароль" });
  }
}
