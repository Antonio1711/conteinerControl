import './style.scss'

export default function Header() {

    return (
        <header>
            <div className='logo'>
                <img src="assets/img/logo.png" alt="Logo de barco" />
                <h2>Conteiner Control</h2>
            </div>
            <div className='links-header'>
                <a href='/'>Conteiners</a>
                <a href='/movimentacoes'>Movimentações</a>
                <a href='/relatorio'>Relatório</a>
            </div>
        </header>
    )
}