import clsx from "clsx";
import type { TestControlsProps, Difficulty } from "../../types";

export default function DesktopDifficultySelector({
    testStatus,
    selectedDifficulty,
    setSelectedDifficulty,
    selectedMode,
    setSelectedMode,
}: TestControlsProps) {
    const difficulties: Difficulty[] = ["Easy", "Medium", "Hard"];

    return (
        <div className="flex gap-3 divide-x divide-neutral-400/30 xl:gap-5">
            <div className="flex items-center gap-2 pr-6">
                <p className="text-neutral-500">Difficulty:</p>
                {difficulties.map((each) => {
                    return (
                        <button
                            disabled={testStatus === "running"}
                            key={each}
                            onClick={() => setSelectedDifficulty(each)}
                            className={clsx(
                                // base
                                "h-7.5 rounded-[5px] border px-2",
                                testStatus === "running"
                                    ? "cursor-not-allowed opacity-50"
                                    : "cursor-pointer",
                                each === selectedDifficulty
                                    ? "border-blue-400 text-blue-400"
                                    : "border-neutral-300 text-neutral-300",
                            )}
                        >
                            {each}
                        </button>
                    );
                })}
            </div>

            <div className="flex items-center gap-2">
                <p className="text-neutral-500">Mode:</p>

                <button
                    onClick={() => setSelectedMode("Timed (60s)")}
                    disabled={testStatus === "running"}
                    className={clsx(
                        "h-7.5 w-25 rounded-[5px] border",
                        testStatus === "running"
                            ? "cursor-not-allowed opacity-50"
                            : "cursor-pointer",
                        "Timed (60s)" === selectedMode
                            ? "border-blue-400 text-blue-400"
                            : "border-neutral-300 text-neutral-300",
                    )}
                >
                    Timed (60s)
                </button>

                <button
                    disabled={testStatus === "running"}
                    onClick={() => setSelectedMode("Passage")}
                    className={clsx(
                        "h-7.5 w-20 rounded-[5px] border",
                        testStatus === "running"
                            ? "cursor-not-allowed opacity-50"
                            : "cursor-pointer",
                        "Passage" === selectedMode
                            ? "border-blue-400 text-blue-400"
                            : "border-neutral-300 text-neutral-300",
                    )}
                >
                    Passage
                </button>
            </div>
        </div>
    );
}
