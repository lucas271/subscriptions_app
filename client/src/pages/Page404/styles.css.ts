import styled from 'styled-components'

export const Page404Container = styled.article`
  margin: 15vh auto;
  width: 90%;
  text-align: center;
  font-size: ${props => props.theme.fontSizes.medium};

  a{
    text-decoration: underline ${props => props.theme.colors.terciary_color};
  }

  h2{
    font-size: ${props => props.theme.fontSizes.large};
  }
  .icon{
    font-size: 15vw;
  }
`
