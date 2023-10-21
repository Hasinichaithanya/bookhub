import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './Header.css'

const Header = props => {
  const {history} = props
  const onLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="header-container">
      <ul className="home header-heading">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/dlnpuom7o/image/upload/v1697352812/Group_7731_ymqkll.png"
            alt="website logo"
            className="website-logo-image"
          />
        </Link>

        <li className="home header-heading">
          <Link to="/">Home</Link>
        </li>

        <li className="header-heading">
          <Link to="/shelf">Bookshelves</Link>
        </li>

        <li className="header-heading">
          <button
            type="button"
            onClick={onLogout}
            className="logout-btn header-heading"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
