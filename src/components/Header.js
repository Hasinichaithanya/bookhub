import {Link, withRouter} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'
import './Header.css'

class Header extends Component {
  state = {
    menu: false,
  }

  mobileMenu = () => {
    this.setState(prev => ({menu: !prev.menu}))
  }

  onLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    const {menu} = this.state
    return (
      <>
        <nav className="header-container-desktop">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dlnpuom7o/image/upload/v1697352812/Group_7731_ymqkll.png"
              alt="website logo"
              className="website-logo-image"
            />
          </Link>
          <ul>
            <li>
              <Link className="home header-heading" to="/">
                Home
              </Link>
            </li>

            <li>
              <Link className="header-heading" to="/shelf">
                Bookshelves
              </Link>
            </li>

            <li className="header-heading">
              <button
                type="button"
                onClick={this.onLogout}
                className="logout-btn header-heading"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
        <nav className="header-container-mobile">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dlnpuom7o/image/upload/v1697352812/Group_7731_ymqkll.png"
              alt="website logo"
              className="website-logo-image-mobile"
            />
          </Link>

          <button type="button" onClick={this.mobileMenu}>
            <img
              src="https://res.cloudinary.com/dlnpuom7o/image/upload/v1698126575/menu_zhzmbs.png"
              className="menu"
              alt="menu"
            />
          </button>
        </nav>
        <div>
          {menu && (
            <ul className="mobile-nav-items">
              <li>
                <Link className="home header-heading" to="/">
                  Home
                </Link>
              </li>

              <li>
                <Link className="header-heading" to="/shelf">
                  Bookshelves
                </Link>
              </li>

              <li className="header-heading">
                <button
                  type="button"
                  onClick={this.onLogout}
                  className="logout-btn header-heading"
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      </>
    )
  }
}

export default withRouter(Header)
