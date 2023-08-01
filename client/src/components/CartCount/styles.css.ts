import styled from 'styled-components'

export const NumberContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 50%;
  top: 50%;
  width: 22px;
  font-size: ${props => props.theme.fontSizes.small};
  font-weight: bold;
  height: 22px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.terciary_color};
  img{
    height: 22px;
    width: 22px;
    color: white;
  }
`
