import { Test, TestingModule } from "@nestjs/testing";
import { JankensController } from "./jankens.controller";

describe("JankensController", () => {
  let controller: JankensController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JankensController],
    }).compile();

    controller = module.get<JankensController>(JankensController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
