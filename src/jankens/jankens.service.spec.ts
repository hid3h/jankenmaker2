import { Test, TestingModule } from "@nestjs/testing";
import { JankensService } from "./jankens.service";

describe("JankensService", () => {
  let service: JankensService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JankensService],
    }).compile();

    service = module.get<JankensService>(JankensService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
