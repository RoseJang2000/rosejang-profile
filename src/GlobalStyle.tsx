import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  a {
    text-decoration: none;
  }
  ul {
    list-style: none;
  }
  body {
    overflow: hidden;
    width: 100vw;
    height: 100vh;
  }
`;
