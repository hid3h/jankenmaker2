"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";

type Hand = "rock" | "scissors" | "paper";

export function PlayingJankenButtons() {
  const [selectedHand, setSelectedHand] = useState<Hand>();
  const { pending } = useFormStatus();

  const Spinner = () => {
    return (
      <div className="flex justify-center" aria-label="読み込み中">
        <div className="animate-spin -ml-0.5 h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );
  };

  return (
    <div>
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
    </div>
  );
}
