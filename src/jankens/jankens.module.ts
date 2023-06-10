import { Module } from "@nestjs/common";
import { JankensController } from "./jankens.controller";
import { JankensService } from './jankens.service';

@Module({
  controllers: [JankensController],
  providers: [JankensService],
})
export class JankensModule {}
