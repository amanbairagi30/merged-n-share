export interface WidgetWebComponentProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  theme?: string | undefined;
  username?: string | undefined;
  'lg-cols'?: number;
  'card-view'?: 'list' | 'grid';
  'font-variable'?: string;
  'md-cols'?: number;
  'base-cols'?: number;
  'top-visible'?: 'true' | 'false';
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'widget-web-component': WidgetWebComponentProps;
    }
  }
}
