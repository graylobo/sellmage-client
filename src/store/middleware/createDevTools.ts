import { optionalDevtools } from "zustand-utils";
import { devtools } from "zustand/middleware";

export const createDevTools =
  (name: string): typeof devtools =>
  (initializer) => {
    let showDevtools = false;

    // check url to show devtools
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      const debug = url.searchParams.get("debug");
      if (debug?.includes(name)) {
        showDevtools = true;
      }
    }

    return optionalDevtools(showDevtools)(initializer, {
      name: `inbangtoday_${name}` + (process.env.NODE_ENV === "development" ? "_DEV" : ""),
    });
  };
