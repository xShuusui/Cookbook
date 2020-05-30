import { createGlobalStyle } from "styled-components";

/** The global style. */
export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    body, html {
        margin: 0;
        padding: 0;
        font-family: sans-serif;
        heigth: 100%;
        width: 100%;
        background-color: #f2f2f2;
    }
`;
