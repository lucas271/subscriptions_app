import 'styled-components'

declare module 'styled-components'{
    export interface DefaultTheme{
        title: string,
        colors: {
            terciary_color: string,
            secundary_color: string,
            primary_color: string,
            text_color: string,
            error_color: string
        },
        fonts: string[],
        fontSizes: {
            small: string,
            default: string,
            medium: string,
            large: string
        }
    }
}
