import { Module } from "@nestjs/common";
import { JankensController } from "./jankens.controller";

@Module({
  controllers: [JankensController],
})
export class JankensModule {}
