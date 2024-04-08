type Janken = {
  id: string;
  title: string;
  description: string;
  winRate: number;
  beforePlayingImagePath: string;
  beforePlayingMessage: string;
  // playerWin: JankeResultDisplay;
  // playerLose: JankeResultDisplay;
  twitterHashtag: string;
};

const jankenRecord: { [K: string]: Janken } = {
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
    // playerWin: {
    //   imagePath: "/poko-player-win.jpeg",
    //   messages: ["にいいいいいい\n勝っちまったなあ！"],
    //   twitterShareMessage:
    //     "なああああああああああああにいいいいいい\n勝っちまったなあ！",
    // },
    // playerLose: {
    //   imagePath: "/poko-player-lose.jpeg",
    //   messages: ["... ..."],
    //   twitterShareMessage: "... ...",
    // },
    twitterHashtag: "クールポコとじゃんけん",
  },
};

export const findJanken = async ({ jankenId }: { jankenId: string }) => {
  const janken = jankenRecord[jankenId];

  if (!janken) {
    return null;
  }

  return {
    title: janken.title,
    beforePlayingImagePath: janken.beforePlayingImagePath,
    beforePlayingMessage: janken.beforePlayingMessage,
  };
};
