import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Render,
} from "@nestjs/common";
import { JankensService } from "./jankens.service";

@Controller("j")
export class JankensController {
  constructor(private readonly jankenService: JankensService) {}

  @Get(":id")
  @Render("jankens/show")
  show(@Param("id") id: string) {
    const janken = this.jankenService.find(id);
    if (!janken) {
      // 404 Not Found
      throw new NotFoundException();
    }

    return {
      id: janken.id,
      title: janken.title,
      imagePath: janken.imagePath,
    };
  }

  // TODO: pathきめ
  @Get(":id/result/:hand")
  @Render("jankens/result")
  rock() {
    return {
      title: "ハム太郎とじゃんけん",
      imagePath: "/ham1.jpg",
    };
  }
}
