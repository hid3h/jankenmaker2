import { Controller, Get, Render } from "@nestjs/common";

@Controller("j")
export class JankensController {
  @Get("ham")
  @Render("jankens/ham")
  ham() {}
}
