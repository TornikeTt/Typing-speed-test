import { useState, useEffect } from "react";

/**
 * Sizes the text window to fill whatever vertical space is actually
 * visible below its top edge — full height when no keyboard is open,
 * automatically shrinking to just the space above the keyboard once one
 * appears.
 */

export function useAvailableHeight(
    windowRef: React.RefObject<HTMLDivElement | null>,
): number | undefined {
    const [height, setHeight] = useState<number>();

    useEffect(() => {
        const viewport = window.visualViewport;

        const update = () => {
            const el = windowRef.current;
            if (!el) return;

            const visibleHeight = viewport?.height ?? window.innerHeight;
            const visibleTop = viewport?.offsetTop ?? 0;
            const elTop = el.getBoundingClientRect().top;

            const available = visibleHeight + visibleTop - elTop;
            setHeight(Math.max(120, available));
        };

        update();

        viewport?.addEventListener("resize", update);
        viewport?.addEventListener("scroll", update);
        window.addEventListener("resize", update);

        return () => {
            viewport?.removeEventListener("resize", update);
            viewport?.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);
        };
    }, [windowRef]);

    return height;
}
