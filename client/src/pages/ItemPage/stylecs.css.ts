import styled from 'styled-components'

export const ItemContainer = styled.main`
  position: relative;
  width: 90vw;
  margin: 3vh auto;
  border-radius: 10px;
  padding: 10px;
  height: 80vh;
  background-color: ${props => props.theme.colors.terciary_color};
  display: flex;

  .item_img_container{
    width: 50%;
    background-color: yellow;
  }

  @media (max-width: 700px) {
    flex-direction: column;
    .item_img_container{
      height: 70%;
      width: 100%;
    }
  }
`
export const ItemRightSide = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 50%;
  align-items: center;
  justify-content: center;
  gap: 15%;

  .item_article{
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 15px;

    p, h2{
      font-size: ${props => props.theme.fontSizes.large};
    }
  }

  .btns_container{
    position: relative;
    width: 80%;
    display: flex;
    justify-content: space-between;
    button{
      color: ${props => props.theme.colors.text_color};
      background-color: transparent;
      border: 1px solid ${props => props.theme.colors.secundary_color};
      border-radius: 3px;
      width: 45%;
      padding: 2px;
      height: 40px;
      transition: 0.2s;
      cursor: pointer;

      &:hover{
        background-color: ${props => props.theme.colors.secundary_color};
      }
    }
  }

  @media (max-width: 700px) {
    width: 100%;
    height: 30%;
    align-items: center;
    gap: 5px;
    justify-content: space-evenly;

    .item_article{
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 2px;

    p, h2{
      font-size: ${props => props.theme.fontSizes.medium};
    }
  }

  .btns_container{
    width: 100%;
    justify-content: space-evenly;
  }
}
`
