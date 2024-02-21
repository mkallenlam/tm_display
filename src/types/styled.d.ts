import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    size: {
      size1: string,
      size2: string,
      size3: string,
      size4: string,
      size5: string,
      size6: string,
      size7: string,
      size8: string,
      blockBorderWidth: string,
      blockRadius: string
      title: string,
      blockTitle: string,
      treemapBorderWidth: string
      treemapGap: string
    },

    colors: {
      background: string,
      foreground: string,
      borderPrimary: string,
      input: string,
      text: string,
      primary: string,
      treemapBorder: string,
      treemapGreen: string,
      treemapRed: string,
      tooltipGreen: string,
      tooltipRed: string,
      positiveText: string,
      negativeText: string
    }
  }
}
