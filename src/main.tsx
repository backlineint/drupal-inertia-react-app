import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";

createInertiaApp({
  resolve: (name) => {
    const pages = import.meta.glob("./Pages/**/*.tsx", { eager: true });
    return pages[`./Pages/${name}.tsx`];
  },
  setup({ el, props }) {
    createRoot(el).render(<App {...props} />);
  },
});
