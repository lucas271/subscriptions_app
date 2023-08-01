import { darken } from 'polished'
import styled from 'styled-components'
export const CartContainer = styled.div`
  position: relative;
  width: 70%;
  height: 80vh;
  padding: 12px;
  border-radius: 5px;
  margin: auto;
  background-color: ${props => props.theme.colors.terciary_color};
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  div, button{
    color: ${props => props.theme.colors.text_color};
  }

  .header, .footer{
    color: ${props => darken(1, props.theme.colors.text_color)};
  }


  .table_container:has(img){
    display: flex;
    align-items: center;
    justify-content: center;
  }
  button{
      background-color: transparent;
      border: 1px solid ${props => props.theme.colors.primary_color};
      padding: 3px;
      border-radius: 7px;
      margin: 0 0.5vw;
      cursor: pointer;

      &:hover{
        background-color: ${props => props.theme.colors.primary_color};
      }
    }
  .footer{
    display: flex;
    align-items: center;
    gap: 3px;
    font-size: ${props => props.theme.fontSizes.medium};

    button{
      width: 100px;
      height: 50px;
      border-radius: 3px;
      padding: 4px;
    }
  }

  

  .title{
    height: 15%;
    font-size: ${props => props.theme.fontSizes.large};
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .table_container{
    position: relative;
    height: 85%;

    header{
      div{
        color: ${props => darken(0.1, props.theme.colors.text_color)};
      }
    }
  }

  @media (max-width: 800px) {
    width: 90%;
  } 
  @media (max-width: 300px) {
    width: 95%;
    height: 85vh;
    padding: 8px;
  } 
`

export const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 15%;


  div{
    width: 23.3%;
    text-align: center;
    overflow: auto;
  }
  .item_name{
    width: 30%;
  }



  @media (max-width: 500px) {
    font-size: ${props => props.theme.fontSizes.small};
  } 
`
