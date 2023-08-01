import { DefaultTheme } from 'styled-components'

const fonts = {
    fonts: ['sans-serif', 'Roboto'],
    fontSizes: {
        small: '0.8em',
        default: '1em',
        medium: '1.3em',
        large: '1.8em'
    }
}

export const darkTheme: DefaultTheme = {
    title: 'dark',
    colors: {
        terciary_color: '#2D3319',
        secundary_color: '#5D576B',
        primary_color: '#131819',
        text_color: '#e9f5f9',
        error_color: '#B71C1C'
    },
    ...fonts
}

export const lightTheme: DefaultTheme = {
    title: 'light',
    colors: {
        terciary_color: '#c0c2ba',
        secundary_color: '#B7D1DA',
        primary_color: '#f5f5f5',
        text_color: '#333',
        error_color: '#EF5350'
    },
    ...fonts
}
