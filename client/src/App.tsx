import { Provider } from 'react-redux'
import Routes from './Routes'
import store from './features/store'
import { darkTheme, lightTheme } from './styles/themes.css'
import { createContext } from 'react'

import { DefaultTheme, ThemeProvider } from 'styled-components'
import GlobalCSS from './styles/global.css'
import usePersistState from './utils/usePersistState'

interface themeSwitcherInterface{
    toggleTheme: () => void
}
export const ThemeSwitcherContext = createContext<themeSwitcherInterface>({
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    toggleTheme: () => {
    }
})

function App () {
    const [theme, setTheme] = usePersistState<DefaultTheme>('theme', darkTheme)

    const toggleTheme = (): void => {
        setTheme(theme.title === 'dark' ? lightTheme : darkTheme)
    }

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <GlobalCSS/>
                <Provider store={store}>
                    <ThemeSwitcherContext.Provider value={{ toggleTheme }}>
                        <Routes/>
                    </ThemeSwitcherContext.Provider>
                </Provider>
            </ThemeProvider>

        </div>
    )
}

export default App
