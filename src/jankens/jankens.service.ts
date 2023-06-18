import { Injectable, NotFoundException } from "@nestjs/common";

export type JankenResult = "playerWin" | "playerLose" | "draw";

type JankeResultDisplay = {
  imagePath: string;
  messages: string[];
  twitterShareMessage: string;
};

type Janken = {
  id: string;
  title: string;
  description: string;
  winRate: number;
  beforePlayingImagePath: string;
  beforePlayingMessage: string;
  playerWin: JankeResultDisplay;
  playerLose: JankeResultDisplay;
  twitterHashtag: string;
};

const jankens: Record<string, Janken> = {
  // hamtaro: {
  //   id: "hamtaro",
  //   title: "ハム太郎とじゃんけん",
  //   description: "ハム太郎とじゃんけんをすることができます。",
  //   winRate: 0.99,
  //   beforePlayingImagePath: "/ham1.jpg",
  //   playerWinMessages: [
  //     "やるやん！\n明日は俺にリベンジさせて。\nじゃあ、どうぞなのだ",
  //   ],
  //   afterPlayingImagePath: "/ham1.jpg",
  //   playerLoseMessages: [
  //     "ぼくの勝ちなのだ！\n負けは次に繋がるチャンスなのだ。\nネバーギブアップ！\nほな、いただきます。\n一日一回勝負。\nそれじゃあ、また明日なのだ。",
  //     "ぼくの勝ちなのだ！\nたかがじゃんけん、そう思ってないですか？\nそれやったら明日も俺が勝ちますよ。\nほな、いただきます。\n一日一回勝負。\nそれじゃあ、また明日なのだ。",
  //     "ぼくの勝ちなのだ！\n何で負けたか、明日まで考えといてなのだ。\nそしたら何かが見えてくるはずです。\nほな、いただきます。\n一日一回勝負。\nそれじゃあ、また明日なのだ。",
  //   ],
  //   twitterHashtag: "ハム太郎とじゃんけん",
  //   beforePlayinMessage: "",
  // },
  coolpoko: {
    id: "coolpoko",
    title: "クールポコ。とじゃんけん",
    description: "クールポコ。とじゃんけんをすることができます。",
    winRate: 0.95,
    beforePlayingImagePath: "/poko-before-playing.jpeg",
    beforePlayingMessage: "なああああああああああああ",
    playerWin: {
      imagePath: "/poko-player-win.jpeg",
      messages: ["にいいいいいい\n勝っちまったなあ！"],
      twitterShareMessage:
        "なああああああああああああにいいいいいい\n勝っちまったなあ！",
    },
    playerLose: {
      imagePath: "/poko-player-lose.jpeg",
      messages: ["... ..."],
      twitterShareMessage: "... ...",
    },
    twitterHashtag: "クールポコ。とじゃんけん",
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

    const jankenResultDisplay: JankeResultDisplay = janken[jankenResult];

    const jankenResultDisplayMessage: string =
      jankenResultDisplay.messages[
        Math.floor(Math.random() * jankenResultDisplay.messages.length)
      ];

    const jankenResultText =
      jankenResult === "playerWin" ? "YOU WIN" : "YOU LOSE";

    const twitterSharedText = encodeURIComponent(
      jankenResultText + "\n" + jankenResultDisplay.twitterShareMessage + "\n",
    );

    const hashtag = encodeURIComponent(janken.twitterHashtag);

    const jankenResultParam = this.jankenResultParam(jankenResult);
    const twitterShareUrl = `https://twitter.com/share?url=https://jankenmaker.com/j/${jankenId}?r=${jankenResultParam}&hashtags=${hashtag}&text=${twitterSharedText}`;

    return {
      janken,
      jankenResultText,
      jankenResultDisplayMessage,
      imagePath: jankenResultDisplay.imagePath,
      twitterShareUrl,
    };
  }

  getOgpImagePath(janken: Janken, jankenResultParam?: string): string {
    if (!jankenResultParam) {
      return janken.beforePlayingImagePath;
    }

    const jankenResult = this.jankenResultFromParam(jankenResultParam);
    const jankenResultDisplay: JankeResultDisplay = janken[jankenResult];
    return jankenResultDisplay.imagePath;
  }

  private getRandomCharacter(from: string): string {
    return from[Math.floor(Math.random() * from.length)];
  }

  private jankenResultParam(outcome: JankenResult): string {
    const alphaNumericChars = "abcdefghijklmnopqrstuvwxyz0123456789";
    const firstChar =
      outcome === "playerWin"
        ? this.getRandomCharacter("abcdefghijklm")
        : this.getRandomCharacter("nopqrstuvwxyz");

    let remainingString = "";
    for (let i = 0; i < 4; i++) {
      remainingString += this.getRandomCharacter(alphaNumericChars);
    }

    return firstChar + remainingString;
  }

  jankenResultFromParam(randomString: string): JankenResult {
    return "abcdefghijklm".includes(randomString[0])
      ? "playerWin"
      : "playerLose";
  }
}
