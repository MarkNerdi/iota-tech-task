import {derived, writable, Writable} from "svelte/store";

export const windowWidth: Writable<number> = writable(window.innerWidth);
export const isOnline: Writable<boolean> = writable(navigator.onLine);

export const isMobileScreen = derived(windowWidth, $windowWidth => $windowWidth < 768);
export const isTabletScreen = derived(windowWidth, $windowWidth => $windowWidth < 1200);
window.addEventListener("resize", () => windowWidth.set(window.innerWidth));
