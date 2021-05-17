import { createGlobalStyle } from 'styled-components';
import { primaryFont } from './typography';
import { normalize } from 'polished';

export const GlobalStyle = createGlobalStyle`
${normalize()}
html {
  box-sizing: border-box;
  font-size: 16px;
}
*, *:before, *:after {
  box-sizing: inherit;
}
body {
  margin: 0;
  padding: 0;
  background: ${(props) => props.theme.bodyBackground};
  font-family: ${primaryFont};
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
main {
  width: 95%;
  margin: 0 auto;
}
`;
