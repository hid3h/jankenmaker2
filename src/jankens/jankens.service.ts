import { Injectable, NotFoundException } from "@nestjs/common";

export type JankenResult = "playerWin" | "playerLose" | "draw";
@Injectable()
export class JankensService {
  find(id: string) {
    if (id !== "hamtaro") {
      return null;
    }

    return {
      id,
      title: "ハム太郎とじゃんけん",
      imagePath: "/ham1.jpg",
      winRate: 0.99,
      playerWinMessages: [
        "やるやん！\n明日は俺にリベンジさせて。\nでは、どうぞ",
      ],
      playerLoseMessages: [
        "ぼくの勝ちなのだ！\n負けは次に繋がるチャンスです。\nネバーギブアップ！\nほな、いただきます。\n一日一回勝負。\nじゃあ、また明日。",
        "ぼくの勝ちなのだ！\nたかがじゃんけん、そう思ってないですか？\nそれやったら明日も俺が勝ちますよ。\nほな、いただきます。一日一回勝負。\nじゃあ、また明日。",
        "ぼくの勝ちなのだ！\n何で負けたか、明日まで考えといてなのだ。\nそしたら何かが見えてくるはずです。\nほな、いただきます。\n一日一回勝負。\nじゃあ、また明日。",
      ],
    };
  }

  play(jankenId) {
    const janken = this.find(jankenId);
    if (!janken) {
      throw new NotFoundException();
    }

    const jankenResult: JankenResult =
      Math.random() < janken.winRate ? "playerLose" : "playerWin";

    const message: string =
      janken[jankenResult + "Messages"][
        Math.floor(Math.random() * janken[jankenResult + "Messages"].length)
      ];

    const jankenResultText =
      jankenResult === "playerWin" ? "YOU WIN" : "YOU LOSE";

    const twitterSharedText = encodeURIComponent(
      jankenResultText + "\n" + message,
    );

    const twitterShareUrl = `https://twitter.com/share?url=https://jankenmaker.com/${jankenId}&hashtags=ハム太郎とじゃんけん&text=${twitterSharedText}`;

    return {
      janken,
      jankenResultText,
      message,
      twitterShareUrl,
    };
  }
}
