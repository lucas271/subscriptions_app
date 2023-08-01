import { createGlobalStyle } from 'styled-components'
import { darken } from 'polished'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-transform: capitalize;
  }

  body{
    background-color: ${props => props.theme.colors.primary_color};
    font-size: ${props => props.theme.fontSizes.default};
    color: ${props => props.theme.colors.text_color};
    font-family: ${props => props.theme.fonts[0]};
  }

  ul{
    list-style: none;
  }

  a{
    text-decoration: none;
    color: ${props => props.theme.colors.text_color};
    transition: 0.4s;
    
    &:hover{
      color: ${props => darken(0.20, props.theme.colors.text_color)} ;
    }
  }

`
