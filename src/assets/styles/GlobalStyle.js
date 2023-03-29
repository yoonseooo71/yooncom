import {createGlobalStyle} from 'styled-components'
import reset from 'styled-reset';
const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
  #root {
    display: flex;
    flex-direction: column;
    align-items: center;
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

