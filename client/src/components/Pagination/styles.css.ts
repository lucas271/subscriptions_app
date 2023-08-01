import styled from 'styled-components'
import { darken } from 'polished'

export const PaginationNumberContainer = styled.div`
  .pagination_btn{
    color: ${props => props.theme.colors.text_color};
    padding: 5px;
    border: none;
    border-radius: 4px;
    background-color: transparent;
    border: 1px solid ${props => props.theme.colors.terciary_color};
    cursor: pointer;
    transition: 0.2s;
    
    &:hover{
      background-color: ${props => props.theme.colors.terciary_color};
    }
  }
  .current_page_btn{
    background-color: ${props => props.theme.colors.terciary_color};

    &:hover{
      border: 1px solid transparent;
      background-color: ${props => darken(0.10, props.theme.colors.terciary_color)};
    }
  }
`
