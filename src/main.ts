import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { join } from "path";
import { NestExpressApplication } from "@nestjs/platform-express";
import * as hbs from "hbs";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, "..", "public"));
  app.setBaseViewsDir(join(__dirname, "..", "views"));
  app.setViewEngine("hbs");

  // partialsの登録
  hbs.registerPartials(join(__dirname, "..", "views", "layouts"));
  hbs.registerPartials(join(__dirname, "..", "views", "partials"));

  hbs.registerHelper("nl2br", (text) => {
    // 改行コードをbrタグに変換
    const result = text.replace(/(\n|\r\n)/g, "<br>");
    return new hbs.SafeString(result);
  });

  await app.listen(8080);
}
bootstrap();
