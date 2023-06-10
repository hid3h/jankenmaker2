import { Controller, Get, Render } from "@nestjs/common";

@Controller("j")
export class JankensController {
  @Get("ham")
  @Render("jankens/ham")
  ham() {
    return {
      title: "ハム太郎とじゃんけん",
      imagePath: "/ham1.jpg",
    };
  }
}
