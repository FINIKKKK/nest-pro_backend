import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { FilesModule } from "src/files/files.module";
import { User } from "src/user/user.model";
import { Post } from "./post.model";
import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports: [SequelizeModule.forFeature([User, Post]), FilesModule],
})
export class PostsModule {}
