import clsx from "clsx";
import { RiArrowDownSLine } from "react-icons/ri";
import type { MobileTestControlsProps, Difficulty, Mode } from "../../types";

export default function MobileDifficultySelector({
    testStatus,
    isDifficultyOpen,
    setIsDifficultyOpen,
    isModeOpen,
    setIsModeOpen,
    selectedDifficulty,
    setSelectedDifficulty,
    selectedMode,
    setSelectedMode,
}: MobileTestControlsProps) {
    const difficulties: Difficulty[] = ["Easy", "Medium", "Hard"];
    const modes: Mode[] = ["Timed (60s)", "Passage"];

    return (
        <>
            <div
                className={clsx(
                    "relative flex h-7.5 flex-1 rounded-md border border-neutral-300 text-neutral-300",
                    testStatus === "running" && "opacity-50",
                )}
            >
                <button
                    disabled={testStatus === "running"}
                    onClick={() => setIsDifficultyOpen((prev) => !prev)}
                    className="flex flex-1 items-center justify-center gap-2"
                >
                    <p>{selectedDifficulty}</p>
                    <RiArrowDownSLine />
                </button>

                {isDifficultyOpen && (
                    <div
                        className={clsx(
                            "absolute top-[calc(100%+15px)] flex h-25 w-full flex-col",
                            "divide-y divide-neutral-400 rounded-md bg-neutral-800",
                            "z-10",
                        )}
                    >
                        {difficulties.map((each) => {
                            const isSelected = selectedDifficulty === each;

                            return (
                                <button
                                    key={each}
                                    onClick={() => {
                                        setSelectedDifficulty(each);
                                        setIsDifficultyOpen(false);
                                    }}
                                    className="flex flex-1 items-center gap-2 pl-3"
                                >
                                    <div
                                        className={clsx(
                                            "flex size-4.5 items-center justify-center rounded-full",

                                            isSelected
                                                ? "border-6 border-blue-400"
                                                : "border-2 border-neutral-300",
                                        )}
                                    >
                                        <div className="size-full rounded-full bg-neutral-950"></div>
                                    </div>
                                    <p className="text-neutral-300">{each}</p>
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>

            <div
                className={clsx(
                    "relative flex h-7.5 flex-1 items-center justify-center",
                    "rounded-md border border-neutral-300 text-neutral-300",
                    testStatus === "running" && "opacity-50",
                )}
            >
                <button
                    disabled={testStatus === "running"}
                    onClick={() => setIsModeOpen((prev) => !prev)}
                    className="flex flex-1 items-center justify-center gap-2"
                >
                    <p>{selectedMode}</p>
                    <RiArrowDownSLine />
                </button>

                {isModeOpen && (
                    <div
                        className={clsx(
                            "absolute top-[calc(100%+15px)] flex h-17 w-full flex-col",
                            "divide-y divide-neutral-400 rounded-md bg-neutral-800",
                            "z-10",
                        )}
                    >
                        {modes.map((each) => {
                            const isSelected = selectedMode === each;

                            return (
                                <button
                                    key={each}
                                    onClick={() => {
                                        setSelectedMode(each);
                                        setIsModeOpen(false);
                                    }}
                                    className="flex flex-1 items-center gap-2 pl-3"
                                >
                                    <div
                                        className={clsx(
                                            "flex size-4.5 items-center justify-center rounded-full",

                                            isSelected
                                                ? "border-6 border-blue-400"
                                                : "border-2 border-neutral-300",
                                        )}
                                    >
                                        <div className="size-full rounded-full bg-neutral-950"></div>
                                    </div>
                                    <p className="text-neutral-300">{each}</p>
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    );
}
