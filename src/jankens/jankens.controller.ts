import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Render,
} from "@nestjs/common";
import { JankensService } from "./jankens.service";
import { JankenPlayingDto } from "./dto/janken-playing-dto";

@Controller()
export class JankensController {
  constructor(private readonly jankenService: JankensService) {}

  @Get("hamtaro")
  @Render("jankens/show")
  show() {
    const id = "hamtaro";
    const janken = this.jankenService.find(id);
    if (!janken) {
      // 404 Not Found
      throw new NotFoundException();
    }

    return {
      id: janken.id,
      title: janken.title,
      imagePath: janken.playerWinImagePath,
      ogp: {
        title: janken.title,
        description: "タップしてハム太郎とじゃんけんをすることができます。",
        url: "https://jankenmaker.com/hamtaro",
        imageUrl: "https://jankenmaker.com/ham1.jpg",
      },
    };
  }

  @Post("hamtaro")
  @Render("jankens/result")
  create(@Body() jankenPlayingDto: JankenPlayingDto) {
    const id = "hamtaro";
    const result = this.jankenService.play(id);
    return {
      id: result.janken.id,
      title: result.janken.title,
      imagePath: result.janken.playerWinImagePath,
      jankenResultText: result.jankenResultText,
      message: result.message,
      palayerHand: jankenPlayingDto.hand,
      twitterShareUrl: result.twitterShareUrl,
    };
  }
}
