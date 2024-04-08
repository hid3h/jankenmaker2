import { notFound, redirect } from "next/navigation";
import { findJanken } from "./jankenService";
import { PlayingJankenButtons } from "./playingJankenButtons";
import { revalidatePath } from "next/cache";
import { useFormState } from "react-dom";
import { PlayingJaken } from "./ui/playignJanken";

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

  return (
    <div className="text-center text-white bg-slate-900 flex justify-center min-h-screen">
      <div className="max-w-xl py-6">
        <h1>{janken.title}</h1>
        <p>
          作者:{" "}
          <a
            href="https://twitter.com/_hid3"
            target="_brank"
            className="underline"
          >
            @Hid3
          </a>
        </p>
        <PlayingJaken
          beforePlayingImagePath={janken.beforePlayingImagePath}
          beforePlayingMessage={janken.beforePlayingMessage}
        />
      </div>
    </div>
  );
}
