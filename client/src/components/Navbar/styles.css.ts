import styled from 'styled-components'

export const NavbarContainer = styled.header`
  height: 60px;
  position: relative;
  width: 100%
`

interface NavbarProps{
    biggerThan90: boolean;
}

export const Navbarstyle = styled.nav<NavbarProps>`
  z-index: 10;
  height: inherit;
  width: inherit;
  position: fixed;
  display: flex;
  background-color: ${props => props.biggerThan90
        ? props.theme.colors.primary_color
        : props.theme.colors.secundary_color};
  align-items: center;
  transition: 0.2s;
  justify-content: space-around;

  @media (max-width: 500px){
    font-size: ${props => props.theme.fontSizes.small};
  }
`

export const UlContainer = styled.div`
  width: 40%
`

export const NavUl = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;

  @media (max-width: 380px){
    font-size: ${props => props.theme.fontSizes.small};
    gap: 9px;
  }
`

export const LogoContainer = styled.div`
  width: 20%;
  text-align: center;
`
