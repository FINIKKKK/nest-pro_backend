import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Role } from "src/roles/role.model";
import { UserRoles } from "src/roles/user_roles.model";

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({ tableName: "users" })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: "1", description: "id" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: "email@gmail.ru", description: "Email" })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: "53543518fdsfsd", description: "Пароль" })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: "false", description: "Забанен или нет" })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  banned: boolean;

  @ApiProperty({ example: "За спам", description: "Причина бана" })
  @Column({ type: DataType.STRING, allowNull: true })
  banReason: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];
}
