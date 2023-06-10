import { Injectable } from "@nestjs/common";

@Injectable()
export class JankensService {
  find(id: string) {
    if (id !== "ham") {
      return null;
    }

    return {
      id,
      title: "ハム太郎とじゃんけん",
      imagePath: "/ham1.jpg",
    };
  }
}
