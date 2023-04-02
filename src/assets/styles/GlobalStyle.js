import {createGlobalStyle} from 'styled-components'
import reset from 'styled-reset';
const GlobalStyle = createGlobalStyle`
  ${reset}
  @font-face {
    font-family: 'BMJUA';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/BMJUA.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
  * {
    box-sizing: border-box;
  }
  #root {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'BMJUA';
  }
  a {
    text-decoration:none;
    color: black;
  }
  h1,h2,h3,h4,h5,h6 {
    margin: 0;
  }
`; 
export default GlobalStyle ; 

