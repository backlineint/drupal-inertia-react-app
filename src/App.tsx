import {
  createHeadManager,
  router,
  PageResolver,
  Page,
  PageProps,
} from "@inertiajs/core";
import { createElement, useEffect, useMemo, useState } from "react";
import HeadContext from "./HeadContext";
import PageContext from "./PageContext";

type HeadManagerOnUpdate = (elements: string[]) => void;
type HeadManagerTitleCallback = (title: string) => string;

interface AppProps {
  // TODO - Try to remove any
  // children?: typeof Children;
  children?: any;
  initialPage: Page<PageProps>;
  initialComponent: unknown;
  resolveComponent: PageResolver;
  titleCallback?: HeadManagerTitleCallback;
  onHeadUpdate?: HeadManagerOnUpdate;
  slots: string | React.JSX.Element | React.JSX.Element[];
}

export default function App({
  children,
  initialPage,
  initialComponent,
  resolveComponent,
  titleCallback,
  onHeadUpdate,
  slots,
}: AppProps) {
  const [current, setCurrent] = useState({
    component: initialComponent || null,
    page: initialPage,
    key: null,
  });

  const headManager = useMemo(() => {
    return createHeadManager(
      typeof window === "undefined",
      titleCallback || ((title) => title),
      onHeadUpdate || (() => {})
    );
  }, []);

  useEffect(() => {
    router.init({
      initialPage,
      resolveComponent,
      swapComponent: async ({ component, page, preserveState }) => {
        setCurrent((current) => ({
          component,
          page,
          key: preserveState ? current.key : Date.now(),
        }));
      },
    });

    router.on("navigate", () => headManager.forceUpdate());
  }, []);

  if (!current.component) {
    return createElement(
      HeadContext.Provider,
      { value: headManager },
      createElement(PageContext.Provider, { value: current.page }, null)
    );
  }

  const renderChildren =
    children ||
    (({ Component, props, key }) => {
      const child = createElement(Component, { key, ...props, slots });

      if (typeof Component.layout === "function") {
        return Component.layout(child);
      }

      if (Array.isArray(Component.layout)) {
        return Component.layout
          .concat(child)
          .reverse()
          .reduce((children, Layout) =>
            createElement(Layout, { children, ...props, slots })
          );
      }

      return child;
    });

  return createElement(
    HeadContext.Provider,
    { value: headManager },
    createElement(
      PageContext.Provider,
      { value: current.page },
      renderChildren({
        Component: current.component,
        key: current.key,
        props: current.page.props,
      })
    )
  );
}

App.displayName = "Inertia";
