import data from "../data.json";
import { useEffect, useMemo, useRef } from "react";
import clsx from "clsx";

import type { MainProps } from "../types";

export default function Main({
    testStatus,
    setIsDifficultyOpen,
    setIsModeOpen,
    setTestStatus,
    selectedDifficulty,
    currentCharIndex,
    setCurrentCharIndex,
    typedStatus,
    setTypedStatus,
}: MainProps) {
    const characters = useMemo(() => {
        const difficulty = selectedDifficulty.toLowerCase() as
            | "easy"
            | "medium"
            | "hard";

        const texts = data[difficulty];
        const randomIndex = Math.floor(Math.random() * texts.length);
        return texts[randomIndex].text.split("");
    }, [selectedDifficulty]);

    const currentCharRef = useRef<HTMLSpanElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        setCurrentCharIndex(0);
        setTypedStatus([]);
    }, [selectedDifficulty]);

    useEffect(() => {
        currentCharRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });
    }, [currentCharIndex]);

    // Focus the hidden input whenever the test is running.
    // This is what makes the mobile on-screen keyboard appear.
    useEffect(() => {
        if (testStatus === "running") {
            inputRef.current?.focus();
        }
    }, [testStatus]);

    useEffect(() => {
        if (testStatus === "running" && currentCharIndex >= characters.length) {
            setTestStatus("finished");
        }
    }, [currentCharIndex, characters, testStatus, setTestStatus]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.ctrlKey || e.metaKey || e.altKey) {
            return;
        }

        if (e.key.length > 1 && e.key !== "Backspace") {
            return;
        }

        e.preventDefault();

        if (e.key === "Backspace") {
            const newIndex = Math.max(0, currentCharIndex - 1);

            setCurrentCharIndex(newIndex);
            setTypedStatus((prev) => {
                const copy = [...prev];
                copy[newIndex] = null;
                return copy;
            });

            return;
        }

        setTypedStatus((prev) => {
            const copy = [...prev];
            copy[currentCharIndex] =
                e.key === characters[currentCharIndex]
                    ? "correct"
                    : "incorrect";
            return copy;
        });

        setCurrentCharIndex((prev) => prev + 1);
    };

    // Fallback for mobile browsers that don't reliably fire keydown
    // per-character (autocorrect/predictive text can eat individual keys).
    // We diff the input's value against what we've already recorded.
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (value.length > currentCharIndex) {
            const typedChar = value[value.length - 1];
            setTypedStatus((prev) => {
                const copy = [...prev];
                copy[currentCharIndex] =
                    typedChar === characters[currentCharIndex]
                        ? "correct"
                        : "incorrect";
                return copy;
            });
            setCurrentCharIndex((prev) => prev + 1);
        } else if (value.length < currentCharIndex) {
            const newIndex = Math.max(0, currentCharIndex - 1);
            setCurrentCharIndex(newIndex);
            setTypedStatus((prev) => {
                const copy = [...prev];
                copy[newIndex] = null;
                return copy;
            });
        }

        // Keep the input's own value cleared so length diffing
        // stays meaningful and it never visibly fills up.
        e.target.value = "";
    };

    return (
        <div className="relative h-full">
            <div
                className={clsx(
                    // base
                    "overflow-y-auto py-10",
                    testStatus !== "running" && "blur-xs",
                )}
                onClick={() => inputRef.current?.focus()}
            >
                <div
                    className={clsx(
                        "font-sans text-3xl font-semibold text-neutral-300/30",
                        testStatus !== "running" &&
                            "pointer-events-none select-none",
                    )}
                >
                    {characters.map((char, index) => {
                        return (
                            <span
                                key={index}
                                ref={
                                    currentCharIndex === index
                                        ? currentCharRef
                                        : null
                                }
                                className={clsx(
                                    currentCharIndex === index &&
                                        "rounded bg-neutral-700",
                                    typedStatus[index] === "correct" &&
                                        "text-green-500",
                                    typedStatus[index] === "incorrect" &&
                                        "text-red-500 underline underline-offset-2",
                                )}
                            >
                                {char}
                            </span>
                        );
                    })}
                </div>
            </div>

            {/* Hidden input — invisible, but focusable, so the OS
                shows the on-screen keyboard on mobile. */}
            <input
                ref={inputRef}
                type="text"
                inputMode="text"
                autoCapitalize="off"
                autoCorrect="off"
                autoComplete="off"
                spellCheck={false}
                value=""
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="pointer-events-none absolute h-0 w-0 opacity-0"
                aria-hidden="true"
            />

            {testStatus !== "running" && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                    <button
                        onClick={() => {
                            setIsDifficultyOpen(false);
                            setIsModeOpen(false);
                            setTestStatus("running");
                            requestAnimationFrame(() =>
                                inputRef.current?.focus(),
                            );
                        }}
                        className={clsx(
                            "text-neutral-0 cursor-pointer rounded-xl bg-blue-600",
                            "px-6 py-3 text-xl",
                        )}
                    >
                        Start Typing Test
                    </button>
                    <p className="text-neutral-0 mt-3 text-lg">
                        No delay — the timer runs as soon as you start
                    </p>
                </div>
            )}
        </div>
    );
}
