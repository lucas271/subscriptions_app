import styled from 'styled-components'
import { darken } from 'polished'

export const UserAuthContainer = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .auth_form_container{
    position: relative;
    width: 80%;
    height: 90%;
    background-color: ${props => props.theme.colors.secundary_color};

    padding: 10px;
    //padding bottom increased to cover for error space
    padding-bottom: 3%;
    border-radius: 5px;
    
    .back_space{
      font-size: ${props => props.theme.fontSizes.medium};
      position: absolute;
      cursor: pointer;

      &:hover{
        color: ${props => props.theme.colors.primary_color};
      }
    }
  }
  @keyframes come_from_right{
    0%{
        opacity: 0;
        transform: translateX(100%);
    }
    100%{
        transform: translateX(0);
        opacity: 10;
    }
  }

  @keyframes come_from_left{
    0%{
        transform: translateX(-100%);
        opacity: 0;
    }
    100%{
        transform: translateX(0);
        opacity: 10;
    }
  }
  .auth_form_container_left{
    animation: 1s ease-in-out come_from_left;
  }
  .auth_form_container_right{
    animation: 1s ease-in-out come_from_right;
  }

  .auth_form_container_loading{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    img{
      width: 20%;
    }
  }

  @media (min-width: 800px) {
    .auth_form_container{
      width: 60%;
    }
  } 
`

export const AuthErrorContainerWrapper = styled.div`
  height: 7%;
  width: inherit;
  margin: auto;
  

`
export const AuthErrorContainer = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  font-size: ${props => props.theme.fontSizes.small};


  border-radius: 5px;
  padding: 5px;
  background-color: ${props => props.theme.colors.error_color};

  @media (min-width: 800px) {
    width: 85%;
    height: 85%;
    font-size: ${props => props.theme.fontSizes.default};
  } 
`

export const UserAuthTitle = styled.div`
  height: 10%;
  display: flex;
  align-items: center;

  @media (min-width: 800px) {
    justify-content: center;
  } 
`

export const AuthForm = styled.form`
  height: 75%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  gap: 10px;
`

export const FormFieldContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2px;

  label{
    font-size: ${props => props.theme.fontSizes.medium};
  }

  .input_field{
    width: 100%;
    height: 25px;
    padding: 5px;
  }

  @media (min-width: 800px) {
    align-items: center;
    justify-content: center;
    .input_field{
      width: 60%;

    }
  } 
`

export const FormChangerContainer = styled.div`
  height: 5%;
  width: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 92%;
  left: 0%;
  margin-bottom: 5%;
  
  span{
    color: ${props => darken(0.15, props.theme.colors.text_color)};
    cursor: pointer;

    &:hover{
      color: ${props => darken(0.25, props.theme.colors.text_color)};
    }
  }
`
export const Button = styled.button`
  padding: 5px;
  background-color: ${props => props.theme.colors.secundary_color};
  width: 60%;
  border: 1px solid gray;
  border-radius: 5px;
  transition: 0.3s;
  cursor: pointer;

  &:hover{
    background-color: ${props => props.theme.colors.primary_color};
    color: ${props => props.theme.colors.text_color};
  }
  
  
`
