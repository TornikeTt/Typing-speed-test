import { useState, useEffect } from "react";
import { clsx } from "clsx";
import starTopLeft from "../../src/assets/images/pattern-star-2.svg";
import starBottomRight from "../../src/assets/images/pattern-star-1.svg";
import restart from "../assets/images/icon-restart-copy.svg";
import iconCompleted from "../../src/assets/images/icon-completed.svg";
import iconHighscore from "../../src/assets/images/icon-new-pb.svg";

import type { ResultsProps } from "../types";

const RESULT_CONTENT = {
    baseline: {
        icon: iconCompleted,
        title: "Baseline Established!",
        subtitle:
            "You've set the bar. Now the real challenge begins-time to beat it",
    },
    highscore: {
        icon: iconHighscore,
        title: "High Score Smashed!",
        subtitle: "You're getting faster. That was incredible typing.",
    },
    complete: {
        icon: iconCompleted,
        title: "Test Complete!",
        subtitle: "Solid run. Keep pushing to beat your high score.",
    },
};

export default function Results({
    setTestStatus,
    setResults,
    results,
    wpm,
    accuracy,
    correctCount,
    incorrectCount,
}: ResultsProps) {
    const [bestBefore] = useState(() =>
        results.length ? Math.max(...results) : 0,
    );

    const [isFirstAttempt] = useState(() => results.length === 0);

    useEffect(() => {
        setResults((prev) => [...prev, wpm]);
    }, []);

    const mode = isFirstAttempt
        ? "baseline"
        : wpm > bestBefore
          ? "highscore"
          : "complete";

    const content = RESULT_CONTENT[mode];

    return (
        <div className="relative flex h-full w-full flex-col items-center justify-center gap-8">
            <img
                src={starTopLeft}
                alt=""
                className="absolute top-10 left-0 w-5"
            />

            <img
                src={starBottomRight}
                alt=""
                className="absolute right-0 bottom-0 w-7"
            />

            <div className="z-1 flex flex-col items-center gap-8">
                <img src={content.icon} alt="" />
                <div className="text-center">
                    <h1 className="text-neutral-0 text-2xl font-bold">
                        {content.title}
                    </h1>
                    <p className="mt-2 text-neutral-600">{content.subtitle}</p>
                </div>
            </div>

            <div
                className={clsx(
                    // base
                    "flex w-full flex-col gap-3",
                    // lg
                    "lg:flex-row lg:justify-center",
                )}
            >
                {[
                    { label: "WPM:", value: wpm },
                    { label: "Accuracy:", value: `${accuracy}%` },
                ].map((each, index) => (
                    <div
                        key={index}
                        className={clsx(
                            // base
                            "rounded-sm border border-neutral-600 py-3 pl-3",
                            // lg
                            "lg:px-8",
                        )}
                    >
                        <p className="text-lg text-neutral-700">{each.label}</p>
                        <p className="text-neutral-0 text-xl font-bold">
                            {each.value}
                        </p>
                    </div>
                ))}

                <div className="rounded-sm border border-neutral-600 py-3 pl-3 lg:px-8">
                    <p className="text-lg text-neutral-700">Characters:</p>
                    <p className="text-xl font-bold">
                        <span className="text-green-500">{correctCount}</span>
                        <span className="text-neutral-0">/</span>
                        <span className="text-red-500">{incorrectCount}</span>
                    </p>
                </div>
            </div>

            <button
                className={clsx(
                    "bg-neutral-0 flex cursor-pointer items-center gap-2 rounded-lg px-4 py-3",
                    "text-xl font-semibold text-neutral-800 transition-colors",
                )}
                onClick={() => {
                    setTestStatus("idle");
                }}
            >
                Go Again
                <img src={restart} alt="restart icon" />
            </button>
        </div>
    );
}
