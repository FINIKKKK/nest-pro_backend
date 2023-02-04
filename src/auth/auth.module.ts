import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserService } from "src/user/user.service";
import { UserModule } from "src/user/user.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY || "SECRET",
      signOptions: {
        expiresIn: "24h",
      },
    }),
  ],
})
export class AuthModule {}
