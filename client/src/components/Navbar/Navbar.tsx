import React, { useContext, useEffect, useState } from 'react'
import { UlContainer, NavbarContainer, Navbarstyle, NavUl, LogoContainer } from './styles.css'
import { BsMoon, BsSun, BsMinecart, BsTrash } from 'react-icons/bs'

import { ThemeContext } from 'styled-components'

import { ThemeSwitcherContext } from '../../App'
import Switch from 'react-switch'
import { Link, useLocation } from 'react-router-dom'
import CartCount from '../CartCount/CartCount'
import { useSelector } from 'react-redux'
import { RootState } from '../../features/store'
import { UserAuthSliceType } from '../../features/userAuth/userSlicer'

const Navbar: React.FC = () => {
    const { colors, title } = useContext(ThemeContext)
    const { toggleTheme } = useContext(ThemeSwitcherContext)
    const [scrollYtracker, setScrollYTracker] = useState<number>(0)
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth)
    const location = useLocation()
    const user = useSelector<RootState, UserAuthSliceType>(state => state.userAuthSlice)

    const logout = () => {
        const isLogout = confirm('Tem certeza q deseja sair?')
        if (isLogout) localStorage.removeItem('tokens')
    }

    function handleScroll () {
        setScrollYTracker(window.scrollY)
    }
    function handleResize () {
        setWindowWidth(window.innerWidth)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        window.addEventListener('resize', handleResize)
    }, [window])

    return <>
        <NavbarContainer>
            <Navbarstyle biggerThan90={scrollYtracker <= 90}>
                <UlContainer className='left_ul_container'>
                    <NavUl>
                        {user.logged && <Link to='/subscription'>Assinei</Link>
                        }
                        {
                            windowWidth < 500 && <li>
                                {
                                    !user.logged
                                        ? <Link to={'/userAuth'} state={location.pathname}>Entrar</Link>
                                        : <a href={location.pathname} onClick={logout}>Logout</a>
                                }
                            </li>
                        }
                        {user.admin && <li><Link to={'/deleteProduct'}><BsTrash/></Link></li>}
                    </NavUl>
                </UlContainer>
                <LogoContainer>
                    <h2>
                        <Link to={'/'}>HOME</Link>
                    </h2>
                </LogoContainer>

                <UlContainer>
                    <NavUl>
                        <li>
                            <Switch
                                onChange={toggleTheme}
                                checked={title !== 'light'}
                                height={20}
                                width={50}
                                checkedIcon={<BsMoon style={{ height: '20px', position: 'absolute', left: 5 }}/>}
                                uncheckedIcon={<BsSun style={{ height: '20px', position: 'absolute', right: 5 }}/>}
                                handleDiameter={20}
                                offColor={colors.primary_color}
                                onColor={colors.primary_color}
                                offHandleColor={colors.text_color}
                                boxShadow={'0px 0px 7px ' + colors.text_color}
                            />
                        </li>
                        {
                            windowWidth >= 500 && <li>
                                {
                                    !user.logged
                                        ? <Link to={'/userAuth'} state={location.pathname}>Entrar</Link>
                                        : <a href={location.pathname} onClick={logout}>Logout</a>
                                }
                            </li>
                        }

                        {user.logged && <li style={{ position: 'relative' }}>
                            <Link to={'/cart'}><BsMinecart/></Link>
                            <CartCount/>
                        </li>}

                    </NavUl>
                </UlContainer>
            </Navbarstyle>
        </NavbarContainer>
    </>
}

export default Navbar
