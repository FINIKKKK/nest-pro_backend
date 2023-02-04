import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ example: "email@gmail.ru", description: "Email" })
  readonly email: string;

  @ApiProperty({ example: "53543518fdsfsd", description: "Пароль" })
  readonly password: string;
}
