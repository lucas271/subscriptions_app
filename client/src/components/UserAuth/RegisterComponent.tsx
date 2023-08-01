import React, { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { createUserThunk, UserAuthSliceType } from '../../features/userAuth/userSlicer'
import { AppThunkDispatch } from '../../features/store'
import CPFMaskedInput from '../CPFMaskedInput'
import { AuthErrorContainer, AuthErrorContainerWrapper, AuthForm, Button, FormChangerContainer, FormFieldContainer, UserAuthContainer, UserAuthTitle } from './styles.css'
import { IoMdArrowBack } from 'react-icons/io'
import { useLocation, useNavigate } from 'react-router-dom'
import { validateCPF } from '../../utils/validateCpf'
import loadingGIF from '../../assets/loading.gif'

interface Props{
    user: UserAuthSliceType,
    validation: (username:string, password: string, cpf: string) => string[],
    handleIsLoginChange: () => void
    errors: string[]
    setErrors: React.Dispatch<React.SetStateAction<string[]>>
}

const RegisterComponent = ({ user, validation, handleIsLoginChange, errors, setErrors }: Props) => {
    const [password, setPassword] = useState<string>('')
    const [repeatPassword, setRepeatPassword] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [cpf, setCPF] = useState<string>('')
    const [email, setEmail] = useState<string>('')

    const dispatch = useDispatch<AppThunkDispatch>()
    const navigate = useNavigate()

    const location = useLocation()

    const handleRegisterForm = (e: FormEvent<HTMLFormElement>):void => {
        setErrors([])
        const errorsArray = validation(username, password, repeatPassword)
        e.preventDefault()
        if (errorsArray.length > 0) return setErrors(errorsArray)
        if (!validateCPF(cpf)) return setErrors(['invalid CPF'])

        dispatch(createUserThunk({ email, username, password, cpf })).then(() => navigate(location))
    }

    if (user.loading) {
        return <>
            <UserAuthContainer>
                <div className='auth_form_container auth_form_container_right auth_form_container_loading '>
                    <img src={loadingGIF} alt="loading gif" />
                </div>
            </UserAuthContainer>
        </>
    }

    return <UserAuthContainer>

        <div className="auth_form_container auth_form_container_right">
            <IoMdArrowBack className='back_space' onClick={() => navigate(location.state ? location.state : '/')}/>
            <AuthErrorContainerWrapper>{(errors.length > 0) && <AuthErrorContainer>
                {errors && errors.map(error => <span key={error} className='error_auth'>{error}</span>)}
            </AuthErrorContainer>
            }
            </AuthErrorContainerWrapper>
            <UserAuthTitle><h2>Register</h2></UserAuthTitle>

            <AuthForm action="" className="auth_form" onSubmit={(e) => handleRegisterForm(e)}>
                <FormFieldContainer>
                    <label htmlFor="">CPF:</label>
                    <CPFMaskedInput cpf={cpf} setCPF={setCPF} className='input_field'/>
                </FormFieldContainer>
                <FormFieldContainer>
                    <label htmlFor="">Usuário:</label>
                    <input
                        className="input_field"
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                    />
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
                <FormFieldContainer>
                    <label htmlFor="">Repetir senha: </label>
                    <input
                        className="input_field"
                        type="password"
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        value={repeatPassword}
                    />
                </FormFieldContainer>
                <FormFieldContainer>
                    <label htmlFor="">email: </label>
                    <input
                        className="input_field"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </FormFieldContainer>
                <Button>Cadastrar</Button>
            </AuthForm>
            <FormChangerContainer>
                <p className="form_change">
                         Tem uma conta? <span onClick={() => {
                        handleIsLoginChange()
                        setErrors([])
                    }}>Logue!</span>
                </p>
            </FormChangerContainer>
        </div>
    </UserAuthContainer>
}

export default RegisterComponent
