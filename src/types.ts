// ---------- Shared helper ----------
export type Setter<T> = React.Dispatch<React.SetStateAction<T>>;

// ---------- Core value types ----------
export type Difficulty = "Easy" | "Medium" | "Hard";
export type Mode = "Timed (60s)" | "Passage";
export type TestStatus = "idle" | "running" | "finished";

export type CharResult = "correct" | "incorrect" | null;
export type CharResults = CharResult[];

// ---------- Mobile dropdown open/close state ----------
export type DifficultyModeOpenState = {
    isDifficultyOpen: boolean;
    setIsDifficultyOpen: Setter<boolean>;
    isModeOpen: boolean;
    setIsModeOpen: Setter<boolean>;
};

// ---------- Header / difficulty & mode selectors ----------
export type TestControlsProps = {
    testStatus: TestStatus;
    selectedDifficulty: Difficulty;
    setSelectedDifficulty: Setter<Difficulty>;
    selectedMode: Mode;
    setSelectedMode: Setter<Mode>;
};

// ---------- Stats (WPM / Accuracy / Time) ----------
export type TestStats = {
    wpm: number;
    accuracy: number;
    formattedTime: string;
};

// ---------- Main (typing area) ----------
export type MainProps = {
    testStatus: TestStatus;
    setTestStatus: Setter<TestStatus>;
    setIsDifficultyOpen: Setter<boolean>;
    setIsModeOpen: Setter<boolean>;
    selectedDifficulty: Difficulty;
    currentCharIndex: number;
    setCurrentCharIndex: Setter<number>;
    typedStatus: CharResults;
    setTypedStatus: Setter<CharResults>;
};

// ---------- Footer (restart control) ----------
export type FooterProps = {
    setTestStatus: Setter<TestStatus>;
    setCurrentCharIndex: Setter<number>;
    setTypedStatus: Setter<CharResults>;
};

// ---------- Results screen ----------
export type ResultsProps = {
    setTestStatus: Setter<TestStatus>;
    setResults: Setter<number[]>;
    results: number[];
    wpm: number;
    accuracy: number;
    correctCount: number;
    incorrectCount: number;
};

export type DesktopTestControlsProps = TestControlsProps;
export type MobileTestControlsProps = TestControlsProps &
    DifficultyModeOpenState;
export type HeaderProps = TestControlsProps &
    TestStats &
    DifficultyModeOpenState &
    TestStats & {
        bestWpm: number;
    };
