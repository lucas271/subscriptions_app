import { darken } from 'polished'
import styled from 'styled-components'

export const ItemContainer = styled.div`
  margin: 0 2%;
  position: relative;
  margin-bottom: 5vh;
  border-radius: 6px;
  height: 33vw;
  width: 29.33%;
  padding-bottom: 5px;

  background-color: ${props => props.theme.colors.terciary_color};


  //admin
  .back{
    position: absolute;
    top: 5px;
    left: 5px;
    background-color: transparent;
    border: none;
    font-size: 1.3rem;
    color: ${props => props.theme.colors.text_color};
    cursor: pointer;

    &:hover{
    color: ${props => darken(0.2, props.theme.colors.text_color)};

    }
  }
  .add_button{
    transition: 0.2s;
    background-color: transparent;
    border: none;
    text-align: center;
    font-size: 6.5rem;
    color: ${props => props.theme.colors.text_color};
    cursor: pointer;

    &:hover{
      color: ${props => darken(0.2, props.theme.colors.text_color)};
    }
  }

  .new_item_container{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 8px;
    width: 90%;

    input{
      width: 80%;
    }
    button{
      background-color: transparent;
      width: 100%;
      border: 2px solid ${props => props.theme.colors.primary_color};
      padding: 5px;
      border-radius: 3.5px;
      transition: 0.2s;
      cursor: pointer;

      &:hover{
        background-color: ${props => props.theme.colors.primary_color};
      }
    }
  }

  //normies
  img{
    height: 60%;
    width: 100%;
  }
  .item_info{
    height: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    gap: 6%;

    h3{
      font-size: ${props => props.theme.fontSizes.medium};
    }
    div{
      font-size: ${props => props.theme.fontSizes.medium};

    }

    .util_btns{
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 3%;
      button{
        padding: 2px;
        background-color: transparent;
        border: 1px solid ${props => props.theme.colors.primary_color};
        border-radius: 3px;
        height: 40px;
        width: 35%;
        cursor: pointer;
        color: ${props => props.theme.colors.text_color};
        transition: 0.3s;

        &:hover{
          background: ${props => props.theme.colors.primary_color};
        }
      }
    }


  }

  @media (max-width: 800px) {
    width: 46%;
    height: 55vw;

    .item_info{
      .util_btns{
        button{
          width: 45%;
        }
      }
    }
  }
  @media (max-width: 500px){
    width: 100%;
    height: 110vw;
  }
`
