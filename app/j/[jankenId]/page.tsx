import { notFound } from "next/navigation";
import { findJanken } from "./jankenService";
import { PlayingJankenButtons } from "./playingJankenButtons";

export default async function JanknDetail({
  params,
}: {
  params: { jankenId: string };
}) {
  const jankenId = params.jankenId;
  const janken = await findJanken({ jankenId });

  if (!janken) {
    notFound();
  }

  const playJanken = async (formData: FormData) => {
    "use server";

    const hand = formData.get("hand");
    // 3秒待つ
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log("formData", formData);
  };

  return (
    <div className="text-center text-white bg-slate-900 flex justify-center min-h-screen">
      <div className="max-w-xl py-6">
        <h1>{janken.title}</h1>
        <p>
          作者:
          <a
            href="https://twitter.com/_hid3"
            target="_brank"
            className="underline"
          >
            @Hid3
          </a>
        </p>
        <img src={janken.beforePlayingImagePath} className="mt-6" />
        <p className="mt-6">{janken.beforePlayingMessage}</p>
        <div className="text-slate-900 p-6">
          <form action={playJanken}>
            <PlayingJankenButtons />
          </form>
        </div>
      </div>
    </div>
  );
}
