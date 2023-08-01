import React, { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUserThunk, UserAuthSliceType } from '../../features/userAuth/userSlicer'
import { AppThunkDispatch } from '../../features/store'
import { AuthForm, AuthErrorContainer, AuthErrorContainerWrapper, UserAuthContainer, UserAuthTitle, FormFieldContainer, FormChangerContainer, Button } from './styles.css'
import { IoMdArrowBack } from 'react-icons/io'
import { useNavigate, useLocation } from 'react-router-dom'
import CPFMaskedInput from '../CPFMaskedInput'
import { validateCPF } from '../../utils/validateCpf'
import loadingGIF from '../../assets/loading.gif'

interface Props{
    user: UserAuthSliceType,
    validation: (username:string, password: string) => string[],
    handleIsLoginChange: () => void
    errors: string[]
    setErrors: React.Dispatch<React.SetStateAction<string[]>>
}

// styles done in page/UserAuth due to commum styles with LoginComponent

const LoginComponent = ({ user, validation, handleIsLoginChange, errors, setErrors }: Props) => {
    const [password, setPassword] = useState<string>('')
    const [cpf, setCpf] = useState<string>('')

    const dispatch = useDispatch<AppThunkDispatch>()
    const navigate = useNavigate()

    const location = useLocation()

    const handleLoginForm = (e: FormEvent<HTMLFormElement>):void => {
        setErrors([])
        e.preventDefault()
        const errorsArray = validation(cpf, password)

        if (errorsArray.length > 0) return setErrors(errorsArray)
        if (!validateCPF(cpf)) return setErrors(['invalid cpf'])

        dispatch(loginUserThunk({ cpf, password })).then(() => navigate(location))
    }
    if (user.loading) {
        return <>
            <UserAuthContainer>
                <div className='auth_form_container auth_form_container_left auth_form_container_loading '>
                    <img src={loadingGIF} alt="loading gif" />
                </div>
            </UserAuthContainer>
        </>
    }
    return <UserAuthContainer>
        <div className="auth_form_container auth_form_container_left">
            <IoMdArrowBack className='back_space' onClick={() => navigate(location.state ? location.state : '/')}/>
            <AuthErrorContainerWrapper>
                {(errors.length > 0) && <AuthErrorContainer>
                    {errors && errors.map(error => {
                        return <span key={error} className='error_auth'>{error}</span>
                    })}
                </AuthErrorContainer>}
            </AuthErrorContainerWrapper>
            <UserAuthTitle><h2>Logar</h2></UserAuthTitle>

            <AuthForm action="" className="auth_form" onSubmit={(e) => handleLoginForm(e)}>
                <FormFieldContainer>
                    <label htmlFor="">CPF:</label>
                    <CPFMaskedInput cpf={cpf} setCPF={setCpf} className='input_field'/>
                </FormFieldContainer>
                <FormFieldContainer>
                    <label htmlFor="">Senha:</label>
                    <input
                        className="input_field"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </FormFieldContainer>
                <Button>Entrar</Button>
            </AuthForm>
            <FormChangerContainer>
                <p className="form_change">
                    Não tem uma conta? <span onClick={() => {
                        handleIsLoginChange()
                        setErrors([])
                    }}>registre!</span>
                </p>
            </FormChangerContainer>
        </div>
    </UserAuthContainer>
}

export default LoginComponent
