import {Link} from 'react-router-dom'
import './Header.css'

const Header = () => (
  <div className="header-container">
    <Link to="/" className="home header-heading">
      <img
        src="https://res.cloudinary.com/dlnpuom7o/image/upload/v1697352812/Group_7731_ymqkll.png"
        alt="website logo"
        className="website-logo-image"
      />
    </Link>
    <ul>
      <li>
        <Link to="/" className="home header-heading">
          Home
        </Link>
      </li>
      <li>
        <Link to="/shelf" className="header-heading">
          Books
        </Link>
      </li>
      <li>
        <Link to="/login" className="header-heading">
          <button type="button" className="logout-btn">
            Logout
          </button>
        </Link>
      </li>
    </ul>
  </div>
)

export default Header
