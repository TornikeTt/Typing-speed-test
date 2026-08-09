import "./App.css";
import Header from "./Components/Header/Header";
import Main from "./Components/Main";
import Footer from "./Components/Footer";
import Results from "./Components/Results";
import clsx from "clsx";

import { useState } from "react";
import { useTestStats } from "./hooks/useTestStats";
import type { Difficulty, Mode, TestStatus, CharResults } from "./types";

function App() {
    const [testStatus, setTestStatus] = useState<TestStatus>("finished");

    const [isDifficultyOpen, setIsDifficultyOpen] = useState(false); // for mobile
    const [isModeOpen, setIsModeOpen] = useState(false); // for mobile

    const [selectedDifficulty, setSelectedDifficulty] =
        useState<Difficulty>("Easy");
    const [selectedMode, setSelectedMode] = useState<Mode>("Timed (60s)");
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [typedStatus, setTypedStatus] = useState<CharResults>([]);

    const [results, setResults] = useState<number[]>([]);
    const bestWpm = results.length > 0 ? Math.max(...results) : 0;

    const { wpm, accuracy, formattedTime, correctCount, incorrectCount } =
        useTestStats({
            testStatus,
            setTestStatus,
            selectedMode,
            typedStatus,
        });

    return (
        <section className="flex min-h-screen w-screen justify-center bg-neutral-900">
            <div
                className={clsx(
                    "grid min-h-full w-full max-w-360 grid-rows-[auto_1fr_auto] overflow-clip",
                    "divide-y divide-neutral-400/30 bg-neutral-900 p-4",
                )}
            >
                <Header
                    testStatus={testStatus}
                    isDifficultyOpen={isDifficultyOpen} //
                    setIsDifficultyOpen={setIsDifficultyOpen} //
                    isModeOpen={isModeOpen} //
                    setIsModeOpen={setIsModeOpen} //
                    selectedDifficulty={selectedDifficulty}
                    setSelectedDifficulty={setSelectedDifficulty}
                    selectedMode={selectedMode}
                    setSelectedMode={setSelectedMode}
                    wpm={wpm}
                    accuracy={accuracy}
                    formattedTime={formattedTime}
                    bestWpm={bestWpm}
                />

                {testStatus !== "finished" ? (
                    <>
                        <Main
                            testStatus={testStatus}
                            setIsDifficultyOpen={setIsDifficultyOpen} //
                            setIsModeOpen={setIsModeOpen} //
                            setTestStatus={setTestStatus}
                            selectedDifficulty={selectedDifficulty}
                            currentCharIndex={currentCharIndex}
                            setCurrentCharIndex={setCurrentCharIndex}
                            typedStatus={typedStatus}
                            setTypedStatus={setTypedStatus}
                        />
                        {testStatus === "running" && (
                            <Footer
                                setCurrentCharIndex={setCurrentCharIndex}
                                setTypedStatus={setTypedStatus}
                                setTestStatus={setTestStatus}
                            />
                        )}
                    </>
                ) : (
                    <Results
                        setTestStatus={setTestStatus}
                        setResults={setResults}
                        results={results}
                        wpm={wpm}
                        accuracy={accuracy}
                        correctCount={correctCount}
                        incorrectCount={incorrectCount}
                    />
                )}
            </div>
        </section>
    );
}

export default App;
