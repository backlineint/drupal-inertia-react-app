import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import parse from "html-react-parser";

import App from "./App.tsx";

createInertiaApp({
  resolve: (name) => {
    const pages = import.meta.glob("./Pages/**/*.tsx", { eager: true });
    return pages[`./Pages/${name}.tsx`];
  },
  setup({ el, props }) {
    const slots = el.querySelectorAll("template");
    const processedSlots = [];
    slots.forEach((element) => {
      const name = element.getAttribute("name");
      processedSlots[name] = parse(element.innerHTML);
    });
    createRoot(el).render(<App {...props} slots={processedSlots} />);
  },
});
