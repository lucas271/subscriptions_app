import styled from 'styled-components'

export const LoadingContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  img{
    margin-top: 30vh;
    position: fixed;
    width: 20vw;
  }
  @media (max-width: 500px) {
    img{
      width: 35vw;
    }
  }
`
export const ItemsContainer = styled.div`
  position: relative;
  width: 95%;
  margin: auto;
  position: relative;
  display: flex;
  flex-wrap: wrap;

  @media (max-width: 500px){
    width: 85%;
  }
`
