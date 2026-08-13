import { useEffect } from "react";

/**
 * Keeps the line the user is currently typing pinned to the top of the
 * text window by translating the text track up rather than scrolling.
 */
export function useLineFollow(
    currentCharIndex: number,
    charRef: React.RefObject<HTMLSpanElement | null>,
    trackRef: React.RefObject<HTMLDivElement | null>,
) {
    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const charEl = charRef.current;
        const offset = charEl?.offsetTop ?? 0;

        track.style.transform = `translateY(-${offset}px)`;
    }, [currentCharIndex, charRef, trackRef]);
}
