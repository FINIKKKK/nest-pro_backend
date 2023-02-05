import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { FilesService } from "src/files/files.service";
import { CreatePostDto } from "./post.dto";
import { Post } from "./post.model";

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private postRepository: typeof Post,
    private filesService: FilesService
  ) {}

  async createPost(dto: CreatePostDto, image: any) {
    const fileName = await this.filesService.createFile(image);
    const post = await this.postRepository.create({ ...dto, image: fileName });
    return post;
  }
}
