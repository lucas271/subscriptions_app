
import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import LoginComponent from '../../components/UserAuth/LoginComponent'
import RegisterComponent from '../../components/UserAuth/RegisterComponent'
import { UserAuthSliceType } from '../../features/userAuth/userSlicer'
import { RootState } from '../../features/store'
import { Navigate } from 'react-router-dom'

const UserAuth = () => {
    const user = useSelector<RootState, UserAuthSliceType>(state => state.userAuthSlice)
    const [errors, setErrors] = useState<string[]>([])
    const [isLogin, setIsLogin] = useState<boolean>(true)

    const handleIsLoginChange = (): void => {
        setIsLogin(!isLogin)
        setErrors([])
    }

    const validation = (username:string, password:string, repeatPassword?:string): string[] => {
        if (!username || !password) return ['Empty fields']

        if (password.length > 20) return ['password cannot be longer than 20 chars']
        if (password.length < 6) return ['password cannot be smaller than 6 chars']

        // validation for register
        if (typeof repeatPassword !== 'string') return []
        if (repeatPassword !== password) return ['passwords must match']
        return []
    }

    useEffect(() => {
        setErrors(user.errors)
    }, [user.errors])

    if (user.logged) return <Navigate to={'/'}/>

    return (
        <div>
            {isLogin
                ? <LoginComponent user={user} validation={validation} handleIsLoginChange={handleIsLoginChange} errors={errors} setErrors={setErrors}/>
                : <RegisterComponent user={user} validation={validation} handleIsLoginChange={handleIsLoginChange} errors={errors} setErrors={setErrors}/>
            }
        </div>
    )
}

export default UserAuth
