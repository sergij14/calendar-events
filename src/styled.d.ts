import "styled-components";

// creating declaration for typed styled-component theme

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      text: string;
      bg: string;
      subMenuBg: string;
      border: string;
      button: string;
      error: string,
    };
    breakPoints: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
  }
}
