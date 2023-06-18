import { Injectable, NotFoundException } from "@nestjs/common";

export type JankenResult = "playerWin" | "playerLose" | "draw";

type Janken = {
  id: string;
  title: string;
  description: string;
  winRate: number;
  playerWinImagePath: string;
  playerWinMessages: string[];
  playerLoseImagePath: string;
  playerLoseMessages: string[];
  twitterHashtag: string;
};

const jankens: Record<string, Janken> = {
  hamtaro: {
    id: "hamtaro",
    title: "ハム太郎とじゃんけん",
    description: "ハム太郎とじゃんけんをすることができます。",
    winRate: 0.99,
    playerWinImagePath: "ham1.jpg",
    playerWinMessages: [
      "やるやん！\n明日は俺にリベンジさせて。\nじゃあ、どうぞなのだ",
    ],
    playerLoseImagePath: "ham1.jpg",
    playerLoseMessages: [
      "ぼくの勝ちなのだ！\n負けは次に繋がるチャンスなのだ。\nネバーギブアップ！\nほな、いただきます。\n一日一回勝負。\nそれじゃあ、また明日なのだ。",
      "ぼくの勝ちなのだ！\nたかがじゃんけん、そう思ってないですか？\nそれやったら明日も俺が勝ちますよ。\nほな、いただきます。\n一日一回勝負。\nそれじゃあ、また明日なのだ。",
      "ぼくの勝ちなのだ！\n何で負けたか、明日まで考えといてなのだ。\nそしたら何かが見えてくるはずです。\nほな、いただきます。\n一日一回勝負。\nそれじゃあ、また明日なのだ。",
    ],
    twitterHashtag: "ハム太郎とじゃんけん",
  },
  coolpoko: {
    id: "coolpoko",
    title: "クールポコとじゃんけん",
    description: "クールポコとじゃんけんをすることができます。",
    winRate: 0.95,
    playerWinImagePath: "poko-player-win.jpg",
    playerWinMessages: ["なああああああああああああにいいいいいい"],
    playerLoseImagePath: "poko-player-lose.jpg",
    playerLoseMessages: [
      "なああああああああああああにいいいいいい\nやっちまったなあ！",
    ],
    twitterHashtag: "クールポコとじゃんけん",
  },
};

@Injectable()
export class JankensService {
  find(id: string) {
    const janken = jankens[id];

    return janken;
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

    const hashtag = encodeURIComponent(janken.twitterHashtag);

    const twitterShareUrl = `https://twitter.com/share?url=https://jankenmaker.com/${jankenId}&hashtags=${hashtag}&text=${twitterSharedText}`;

    return {
      janken,
      jankenResultText,
      message,
      twitterShareUrl,
    };
  }
}
