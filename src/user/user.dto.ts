import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: "email@gmail.ru", description: "Email" })
  @IsString({ message: "Поле должно быть строкой" })
  @IsEmail({}, { message: "Некорректный email" })
  readonly email: string;

  @ApiProperty({ example: "53543518fdsfsd", description: "Пароль" })
  @IsString({ message: "Поле должно быть строкой" })
  @Length(4, 16, { message: "Пароль должен быть от 4 до 16 символов" })
  readonly password: string;
}
