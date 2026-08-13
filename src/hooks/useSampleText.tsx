import { useMemo } from "react";
import data from "../data.json";
export type Difficulty = "easy" | "medium" | "hard";

// Picks a random text sample for the given difficulty.
export function useSampleText(difficulty: string): string[] {
    return useMemo(() => {
        const key = difficulty.toLowerCase() as Difficulty;
        const samples = data[key];
        const sample = samples[Math.floor(Math.random() * samples.length)];
        return sample.text.split("");
    }, [difficulty]);
}
