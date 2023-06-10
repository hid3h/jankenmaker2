import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { JankensModule } from "./jankens/jankens.module";

@Module({
  imports: [JankensModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
