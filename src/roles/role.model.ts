import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "src/user/user.model";
import { UserRoles } from "./user_roles.model";

interface RoleCreationAttrs {
  value: string;
  description: string;
}

@Table({ tableName: "roles" })
export class Role extends Model<Role, RoleCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING })
  value: string;

  @Column({ type: DataType.STRING })
  description: string;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}
