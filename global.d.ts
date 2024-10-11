declare global {
    namespace JSX {
      interface IntrinsicElements {
        "widget-web-component": React.DetailedHTMLProps<
          React.HTMLAttributes<HTMLElement>,
          HTMLElement
        > & {
          username: string;
          theme: string;
        };
      }
    }
  }