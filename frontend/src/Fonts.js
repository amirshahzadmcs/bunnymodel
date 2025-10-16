import { Global } from '@emotion/react'

const Fonts = () => (
  <Global
    styles={`
       @font-face {
        font-family: 'SF Pro';
        src: url('/fonts/SFProDisplay/SF-Pro-Regular.otf') format('opentype');
        font-weight: normal;
        font-style: normal;
      }

      @font-face {
        font-family: 'SF Pro';
        src: url('/fonts/SFProDisplay/SF-Pro-Bold.otf') format('opentype');
        font-weight: bold;
        font-style: normal;
      }
      @font-face {
        font-family: 'D-DIN';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('/Fonts/D-DIN.woff') format('woff');
      }
      @font-face {
        font-family: 'D-DIN';
        font-style: italic;
        font-weight: 400;
        font-display: swap;
        src: url('/Fonts/D-DIN-Italic.woff') format('woff');
      }
      @font-face {
        font-family: 'D-DIN';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url('/Fonts/D-DIN-Bold.woff') format('woff');
      }
      @font-face {
        font-family: 'D-DIN Condensed';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url('/Fonts/D-DINCondensed-Bold.woff') format('woff');
      }
      @font-face {
        font-family: 'D-DIN Condensed';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('/Fonts/D-DINCondensed.woff') format('woff');
      }
      @font-face {
        font-family: 'D-DIN Expanded';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('/Fonts/D-DINExp.woff') format('woff');
      }
      @font-face {
        font-family: 'D-DIN Expanded';
        font-style: italic;
        font-weight: 400;
        font-display: swap;
        src: url('/Fonts/D-DINExp-Italic.woff') format('woff');
      }
      @font-face {
        font-family: 'D-DIN Expanded';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url('/Fonts/D-DINExp-Bold.woff') format('woff');
      }
    `}
  />
)

export default Fonts