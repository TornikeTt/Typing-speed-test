import clsx from "clsx";
import restart from "../assets/images/icon-restart.svg";
import type { FooterProps } from "../types";

export default function Footer({
    setCurrentCharIndex,
    setTypedStatus,
    setTestStatus,
}: FooterProps) {
    return (
        <footer className="flex items-center justify-center border-t border-neutral-700 py-6">
            <button
                onClick={() => {
                    setTestStatus("idle");
                    setCurrentCharIndex(0);
                    setTypedStatus([]);
                }}
                className={clsx(
                    // base
                    "flex cursor-pointer items-center gap-2 rounded-lg bg-neutral-800 px-4 py-3",
                    "text-xl font-semibold text-neutral-300 transition-colors",
                    "hover:bg-neutral-700 hover:text-white",

                    // Click effect
                    "active:scale-95 active:bg-neutral-700 active:text-white",
                    "focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2",
                    "focus:ring-offset-neutral-950 focus:outline-none",
                )}
            >
                Restart Test
                <img src={restart} alt="restart icon" />
            </button>
        </footer>
    );
}
