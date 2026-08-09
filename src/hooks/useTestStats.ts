import { useEffect, useState } from "react";
import type { TestStatus, Mode, CharResults, Setter } from "../types";

type UseTestStatsArgs = {
    testStatus: TestStatus;
    setTestStatus: Setter<TestStatus>;
    selectedMode: Mode;
    typedStatus: CharResults;
};

export function useTestStats({
    testStatus,
    setTestStatus,
    selectedMode,
    typedStatus,
}: UseTestStatsArgs) {
    const [elapsedSeconds, setElapsedSeconds] = useState(0);

    // Reset the clock any time we're back at idle (restart, new difficulty, etc.)
    useEffect(() => {
        if (testStatus === "idle") {
            setElapsedSeconds(0);
        }
    }, [testStatus]);

    // Tick every second while the test is running
    useEffect(() => {
        if (testStatus !== "running") return;

        const interval = setInterval(() => {
            setElapsedSeconds((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [testStatus]);

    // Timed mode auto-finishes when the clock runs out
    useEffect(() => {
        if (
            testStatus === "running" &&
            selectedMode === "Timed (60s)" &&
            elapsedSeconds >= 60
        ) {
            setTestStatus("finished");
        }
    }, [elapsedSeconds, selectedMode, testStatus, setTestStatus]);

    const correctCount = typedStatus.filter(
        (status) => status === "correct",
    ).length;
    const incorrectCount = typedStatus.filter(
        (status) => status === "incorrect",
    ).length;
    const attemptedCount = correctCount + incorrectCount;

    // Standard WPM formula: (correct chars / 5) / minutes elapsed
    const wpm =
        elapsedSeconds > 0
            ? Math.round(correctCount / 5 / (elapsedSeconds / 60))
            : 0;

    const accuracy =
        attemptedCount > 0
            ? Math.round((correctCount / attemptedCount) * 100)
            : 100;

    // Timed mode counts down from 60s, Passage mode counts up
    const timeRemaining =
        selectedMode === "Timed (60s)"
            ? Math.max(0, 60 - elapsedSeconds)
            : elapsedSeconds;

    const formattedTime = `0:${timeRemaining.toString().padStart(2, "0")}`;

    return { wpm, accuracy, formattedTime, correctCount, incorrectCount };
}
