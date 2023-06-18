import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  Render,
} from "@nestjs/common";
import { JankensService } from "./jankens.service";
import { JankenPlayingDto } from "./dto/janken-playing-dto";

@Controller()
export class JankensController {
  constructor(private readonly jankenService: JankensService) {}

  @Get("j/:id")
  @Render("jankens/show")
  show(@Param("id") id: string, @Query("r") result: string | undefined) {
    const janken = this.jankenService.find(id);
    if (!janken) {
      // 404 Not Found
      throw new NotFoundException();
    }

    const ogpIamgePath = this.jankenService.getOgpImagePath(janken, result);

    return {
      id: janken.id,
      title: janken.title,
      imagePath: janken.beforePlayingImagePath,
      ogp: {
        title: janken.title,
        description: janken.description,
        url: `https://jankenmaker.com/j/${janken.id}`,
        imageUrl: `https://jankenmaker.com${ogpIamgePath}`,
      },
      formActionPath: `/j/${janken.id}`,
      beforePlayingMessage: janken.beforePlayingMessage,
    };
  }

  @Post("j/:id")
  @Render("jankens/result")
  create(@Param("id") id: string, @Body() jankenPlayingDto: JankenPlayingDto) {
    const result = this.jankenService.play(id);
    return {
      id: result.janken.id,
      title: result.janken.title,
      imagePath: result.imagePath,
      jankenResultText: result.jankenResultText,
      message: result.jankenResultDisplayMessage,
      palayerHand: jankenPlayingDto.hand,
      twitterShareUrl: result.twitterShareUrl,
    };
  }
}
