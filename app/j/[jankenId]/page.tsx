import { notFound } from "next/navigation";
import { findJanken } from "./jankenService";

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
    console.log("hand", hand);
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
            <button
              type="submit"
              className="py-2 px-4 rounded inline-flex items-center bg-white gap-2 font-bold"
            >
              <img
                src="/svgs/hand-back-fist-regular.svg"
                className="w-8 bg-white"
              />
              <span>グーで勝つ</span>
            </button>
            <input type="hidden" name="hand" value="rock" />
          </form>
          <div className="flex justify-between mt-6">
            <form action={playJanken}>
              <button
                type="submit"
                className="py-2 px-4 rounded inline-flex items-center bg-white gap-2 font-bold"
              >
                <img
                  src="/svgs/hand-scissors-regular.svg"
                  className="w-8 bg-white transform rotate-90"
                />
                <span>チョキで勝つ</span>
              </button>
              <input type="hidden" name="hand" value="scissors" />
            </form>
            <form action={playJanken}>
              <button
                type="submit"
                className="py-2 px-4 rounded inline-flex items-center bg-white gap-2 font-bold"
              >
                <img src="/svgs/hand-regular.svg" className="w-8 bg-white" />
                <span>パーで勝つ</span>
              </button>
              <input type="hidden" name="hand" value="paper" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
