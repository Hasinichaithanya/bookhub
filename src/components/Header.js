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
    <div className="header-container">
      <Link to="/" className="home header-heading">
        <img
          src="https://res.cloudinary.com/dlnpuom7o/image/upload/v1697352812/Group_7731_ymqkll.png"
          alt="website logo"
          className="website-logo-image"
        />
      </Link>
      <ul>
        <Link to="/" className="home header-heading">
          <li>Home</li>
        </Link>
        <Link to="/shelf" className="header-heading">
          <li>Bookshelves</li>
        </Link>

        <button
          type="button"
          onClick={onLogout}
          className="logout-btn header-heading"
        >
          Logout
        </button>
      </ul>
    </div>
  )
}

export default withRouter(Header)
