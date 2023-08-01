import { Link } from 'react-router-dom'
import { CgSmileSad } from 'react-icons/cg'
import { Page404Container } from './styles.css'

const Page404 = () => {
    return (
        <>
            <Page404Container>
                <CgSmileSad className="icon" />
                <h2>404 error</h2>
                <p>Rota não existe <br/></p>
                <Link to="/" className="go_home">
                    volte para pagina inicial
                </Link>
            </Page404Container>
        </>
    )
}

export default Page404
