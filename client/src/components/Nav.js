import logo from '../images/white-icon.png'
import colorLogo from '../images/icon-colored.png'

const Nav = ({ minimal, setShowModal, showModal, setIsSignUp }) => {
    const handleClick = () => {
        setShowModal(true)
        setIsSignUp(false)
    }
    const authToken = false
    return (
        <nav>
            <div className="logo-container">
                <img alt="Something" className="logo" src={minimal ? colorLogo : logo} />
            </div>
            {!authToken && !minimal && <button className={"nav-button"}
                onClick={handleClick}
                disabled={showModal}>
                Log in</button>}
        </nav>
    )
}
export default Nav