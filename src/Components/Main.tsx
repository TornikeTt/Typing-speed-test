import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";

import type { MainProps, CharResult } from "../types";
import { useSampleText } from "../hooks/useSampleText";
import { useAvailableHeight } from "../hooks/useAvailableHeight";
import { useLineFollow } from "../hooks/useLineFollow";

/**
 * Maps smart/typographic punctuation to the plain ASCII character a
 * physical or mobile keyboard actually produces.
 */
const PUNCTUATION_EQUIVALENTS: Record<string, string> = {
    "\u2018": "'",
    "\u2019": "'",
    "\u201C": '"',
    "\u201D": '"',
    "\u2013": "-",
    "\u2014": "-",
    "\u2212": "-",
};

function normalizeForComparison(char: string): string {
    return PUNCTUATION_EQUIVALENTS[char] ?? char;
}

/**
 * Derives per-character correctness from the raw typed string.
 */
function getStatusFromTypedText(
    typedText: string,
    characters: string[],
): CharResult[] {
    return typedText.split("").map((char, i) => {
        const expected = characters[i];

        const isMatch =
            char === expected ||
            normalizeForComparison(char) === normalizeForComparison(expected);

        return isMatch ? "correct" : "incorrect";
    });
}

function getCharacterClassName(status: CharResult, isCurrent: boolean) {
    return clsx(
        // Keeps spaces visible and prevents characters from visually
        // running together.
        "inline-block whitespace-pre",

        // Current character.
        isCurrent && "rounded bg-neutral-700",

        // Correct / incorrect characters.
        status === "correct" && "text-green-500",
        status === "incorrect" && "text-red-500 underline underline-offset-2",
    );
}

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
    const characters = useSampleText(selectedDifficulty);

    const currentCharRef = useRef<HTMLSpanElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const windowRef = useRef<HTMLDivElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);

    const availableHeight = useAvailableHeight(windowRef);
    const [_isInputFocused, setIsInputFocused] = useState(false);

    // Reset progress whenever a new text is loaded.
    const [typedText, setTypedText] = useState("");

    useEffect(() => {
        setTypedText("");
    }, [selectedDifficulty]);

    useEffect(() => {
        setCurrentCharIndex(typedText.length);
        setTypedStatus(getStatusFromTypedText(typedText, characters));
    }, [typedText, characters, setCurrentCharIndex, setTypedStatus]);

    useEffect(() => {
        if (testStatus === "running") {
            inputRef.current?.focus();
        }
    }, [testStatus]);

    useEffect(() => {
        if (
            testStatus === "running" &&
            characters.length > 0 &&
            typedText.length >= characters.length
        ) {
            setTestStatus("finished");
        }
    }, [typedText, characters, testStatus, setTestStatus]);

    useLineFollow(currentCharIndex, currentCharRef, trackRef);

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            // Clamp so the field can't grow past the sample text.
            setTypedText(e.target.value.slice(0, characters.length));
        },
        [characters.length],
    );

    const focusHiddenInput = () => {
        if (testStatus === "running") {
            inputRef.current?.focus();
        }
    };

    return (
        <div className="relative h-full">
            {/*
              Window onto the text.
              The previous top/bottom mask has been removed so every
              line has the same appearance on desktop.
            */}
            <div
                ref={windowRef}
                onClick={focusHiddenInput}
                style={{
                    transition: "height 200ms ease-out",
                }}
                className={clsx(
                    "overflow-hidden pt-6 pb-2",
                    testStatus === "running" && "cursor-text",
                    testStatus !== "running" && "blur-xs",
                    //
                    availableHeight && "lg:16rem",
                )}
            >
                <div
                    ref={trackRef}
                    className={clsx(
                        "relative font-sans text-3xl font-semibold text-neutral-300/30",
                        "transition-transform duration-300 ease-in-out",
                        testStatus !== "running" &&
                            "pointer-events-none select-none",
                    )}
                >
                    {characters.map((char, index) => (
                        <span
                            key={index}
                            ref={
                                currentCharIndex === index
                                    ? currentCharRef
                                    : null
                            }
                            className={getCharacterClassName(
                                typedStatus[index] ?? null,
                                currentCharIndex === index,
                            )}
                        >
                            {char}
                        </span>
                    ))}
                </div>
            </div>

            {/*
              Controlled hidden input.
            */}
            <input
                ref={inputRef}
                type="text"
                value={typedText}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                tabIndex={-1}
                onChange={handleChange}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                inputMode="text"
                style={{
                    fontSize: 16,
                    position: "fixed",
                    top: 0,
                    left: 0,
                }}
                className="pointer-events-none h-px w-px opacity-0"
                aria-hidden="true"
            />

            {testStatus !== "running" && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                    <button
                        onClick={() => {
                            setIsDifficultyOpen(false);
                            setIsModeOpen(false);
                            setTestStatus("running");

                            // Focus synchronously within the click handler
                            // so mobile browsers open the keyboard.
                            inputRef.current?.focus();
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
