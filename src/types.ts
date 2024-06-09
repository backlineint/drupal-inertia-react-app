import { type PageProps } from "@inertiajs/core";

export interface PropsFromContext {
  props: PageProps;
  slots: string | React.JSX.Element | React.JSX.Element[];
}
