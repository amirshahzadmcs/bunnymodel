import "./Fonts"
import "@fontsource/space-grotesk"
import "@fontsource/inter"
import "@fontsource/space-grotesk/400.css"
import "@fontsource/space-grotesk/700.css"
import { extendTheme } from '@chakra-ui/react'
import "@fontsource/poppins"; // Defaults to weight 400
import "@fontsource/poppins/400.css"; // Specify weight
import "@fontsource/poppins/400-italic.css"; // Specify weight and style
import "@fontsource/montserrat"; // Defaults to weight 400
import "@fontsource/montserrat/800.css"; // Specify weight
import "@fontsource/montserrat/400-italic.css"; // Specify weight and style
import "@fontsource/aileron"; // Defaults to weight 400
import "@fontsource/aileron/400.css"; // Specify weight
import "@fontsource/aileron/400-italic.css"; // Specify weight and style
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/700.css";

export const mynewtheme = extendTheme({
    colors:{
        primary:"#258CEC ",
        secondry:"#6943FF"
      },
      styles: {
        global: {
          body: {
            bg: "black",
            color: "white",
          },
        },
      },
      components: {
        Tabs: {
          variants: {
            'line': {
              tab: {
                color: "#7B7A7A",
                borderbottom:"none",
               
                _selected: {
                  borderColor: '#0C1E21',
                  borderbottom:"2px solid",
                  color: "#0C1E21",
                  
                  
                  }
              }
            }
          },
        }
      },
      breakpoints: {
        base: "0px",
        sm: "480px",
        md: "768px",
        lg: "1024px",
        xl: "1536px", // 1536px is default xl
        "2xl": "1920px",
      },
      fonts: {
      
        heading: "Aileron",
        body: `"SF Pro Display", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif,Inter,Aileron`,
        sfPro: `"SF Pro", sans-serif`,
      },
      
})
