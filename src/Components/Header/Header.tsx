import logoSmall from "../../assets/images/logo-small.svg";
import logoLarge from "../../assets/images/logo-large.svg";
import personalBest from "../../assets/images/icon-personal-best.svg";

import clsx from "clsx";
import DesktopDifficultySelector from "./DesktopDifficultySelector";
import MobileDifficultySelector from "./MobileDifficultySelector";

import type { HeaderProps } from "../../types";

export default function Header({
    testStatus,
    isDifficultyOpen,
    setIsDifficultyOpen,
    isModeOpen,
    setIsModeOpen,
    selectedDifficulty,
    setSelectedDifficulty,
    selectedMode,
    setSelectedMode,
    wpm,
    accuracy,
    formattedTime,
    bestWpm,
}: HeaderProps) {
    return (
        <header className="flex flex-col gap-5 pb-4 lg:gap-8">
            <div className="flex items-center justify-between">
                <img src={logoSmall} alt="Logo" className="lg:hidden" />
                <img
                    src={logoLarge}
                    alt="logo Large"
                    className="hidden lg:block"
                />

                <div className="flex gap-2">
                    <img src={personalBest} alt="Personal best" />

                    <p className="flex gap-1">
                        <span className="font-semibold text-neutral-400">
                            Best:
                        </span>
                        <span className="text-neutral-300">{bestWpm} WPM</span>
                    </p>
                </div>
            </div>

            {testStatus !== "finished" && (
                <div
                    className={clsx(
                        // base
                        "flex flex-col gap-5",
                        // lg
                        "lg:flex-row lg:justify-between lg:gap-0",
                    )}
                >
                    <div className="flex divide-x divide-neutral-400/30">
                        {[
                            { label: "WPM:", value: wpm },
                            { label: "Accuracy:", value: `${accuracy}%` },
                            { label: "Time:", value: formattedTime },
                        ].map((item, index) => (
                            <div
                                key={item.label}
                                className={clsx(
                                    // base
                                    "flex flex-1 flex-col items-center",
                                    // lg
                                    "lg:flex-none lg:flex-row lg:gap-3",
                                    index > 0 && "lg:justify-center",
                                    index === 0 && "lg:w-20 xl:w-22.5",
                                    index === 1 && "lg:w-45 xl:w-50",
                                    index === 2 && "lg:w-32 xl:w-37.5",
                                )}
                            >
                                <span className="text-neutral-500">
                                    {item.label}
                                </span>
                                <span
                                    className={clsx(
                                        // base
                                        "text-2xl font-semibold text-neutral-300",
                                        // lg
                                        "lg:text-[20px]",
                                    )}
                                >
                                    {item.value}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div>
                        <div className="hidden lg:block">
                            <DesktopDifficultySelector
                                testStatus={testStatus}
                                selectedDifficulty={selectedDifficulty}
                                setSelectedDifficulty={setSelectedDifficulty}
                                selectedMode={selectedMode}
                                setSelectedMode={setSelectedMode}
                            />
                        </div>

                        <div className="flex gap-5 lg:hidden">
                            <MobileDifficultySelector
                                testStatus={testStatus}
                                isDifficultyOpen={isDifficultyOpen} //
                                setIsDifficultyOpen={setIsDifficultyOpen} //
                                isModeOpen={isModeOpen} //
                                setIsModeOpen={setIsModeOpen} //
                                selectedDifficulty={selectedDifficulty}
                                setSelectedDifficulty={setSelectedDifficulty}
                                selectedMode={selectedMode}
                                setSelectedMode={setSelectedMode}
                            />
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
