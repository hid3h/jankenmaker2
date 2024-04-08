// uiディレクトリを用意したのは
// https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#server-side-validation-and-error-handling
// で用意されていたので

"use client";

import { useFormState, useFormStatus } from "react-dom";
import { playJanken } from "../actions";
import { useState } from "react";

export function PlayingJaken({
  beforePlayingImagePath,
  beforePlayingMessage,
}: {
  beforePlayingImagePath: string;
  beforePlayingMessage: string;
}) {
  const [jankenResult, formAction] = useFormState(playJanken, null);
  console.log("jankenResult", jankenResult);

  if (jankenResult) {
    return (
      <>
        <p className="mt-6 text-white font-black text-5xl italic">
          {jankenResult.text}
        </p>
        <img src={jankenResult.imagePath} className="mt-6" />
        <p className="p-6">{jankenResult.message}</p>
        <a
          href={jankenResult.twitterShareUrl}
          className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6"
          target="_brank"
        >
          結果をツイートする
        </a>
      </>
    );
  }

  return (
    <>
      <img src={beforePlayingImagePath} className="mt-6" />
      <p className="mt-6">{beforePlayingMessage}</p>
      <div className="text-slate-900 p-6">
        <form action={formAction}>
          <PlayingJankenButtons />
        </form>
      </div>
    </>
  );
}

type Hand = "rock" | "scissors" | "paper";
const PlayingJankenButtons = () => {
  const [selectedHand, setSelectedHand] = useState<Hand>();
  const { pending } = useFormStatus();

  return (
    <>
      <button
        disabled={pending}
        name="rock"
        type="submit"
        className="w-44 inline-flex items-center justify-center gap-x-2 rounded bg-white px-3.5 py-2.5 font-bold"
        onClick={() => {
          setSelectedHand("rock");
        }}
      >
        {pending && selectedHand == "rock" ? (
          <Spinner />
        ) : (
          <img
            src="/svgs/hand-back-fist-regular.svg"
            className="-ml-0.5 h-8 w-8 bg-white"
          />
        )}

        <span>グーで勝つ</span>
      </button>

      <div className="flex justify-between mt-6">
        <button
          disabled={pending}
          name="scissors"
          type="submit"
          className="w-44 inline-flex items-center justify-center gap-x-2 rounded bg-white px-3.5 py-2.5 font-bold"
          onClick={() => {
            setSelectedHand("scissors");
          }}
        >
          {pending && selectedHand == "scissors" ? (
            <Spinner />
          ) : (
            <img
              src="/svgs/hand-scissors-regular.svg"
              className="-ml-0.5 h-8 w-8 bg-white transform rotate-90"
            />
          )}
          <span>チョキで勝つ</span>
        </button>

        <button
          disabled={pending}
          name="paper"
          type="submit"
          className="w-44 inline-flex items-center justify-center gap-x-2 rounded bg-white px-3.5 py-2.5 font-bold"
          onClick={() => {
            setSelectedHand("paper");
          }}
        >
          {pending && selectedHand == "paper" ? (
            <Spinner />
          ) : (
            <img
              src="/svgs/hand-regular.svg"
              className="-ml-0.5 h-8 w-8 bg-white"
            />
          )}
          <span>パーで勝つ</span>
        </button>
      </div>
    </>
  );
};

const Spinner = () => {
  return (
    <div className="flex justify-center" aria-label="読み込み中">
      <div className="animate-spin -ml-0.5 h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
    </div>
  );
};
