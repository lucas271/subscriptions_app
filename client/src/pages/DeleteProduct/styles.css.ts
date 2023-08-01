import styled from 'styled-components'

export const ItemsContainer = styled.div`
  width: 80vw;
  height: 70vh;
  margin: 6vh auto;
  overflow: auto;
  background-color: ${props => props.theme.colors.secundary_color};
  padding: 10px;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: center;

  .product{
    height: 45px;
    position: relative;
    width: 100%;
    display: flex;
    justify-content: space-around;
    .name{
      height: 20px;
      width: 40%;
      overflow: auto;
    }
    .price{
      height: 20px;
      width: 30%;
    }
    .btn{
      width: 30%;
      height: 20px;
    }
  }
`
