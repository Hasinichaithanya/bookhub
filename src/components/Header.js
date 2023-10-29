import {NavLink, withRouter} from 'react-router-dom'
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
          <NavLink
            to="/"
            isActive={(match, location) => location.pathname === '/'}
          >
            <img
              src="https://res.cloudinary.com/dlnpuom7o/image/upload/v1697352812/Group_7731_ymqkll.png"
              alt="website logo"
              className="website-logo-image"
            />
          </NavLink>
          <ul className="ul-items-desktop">
            <li>
              <NavLink
                exact
                to="/"
                activeClassName="active header-heading"
                className="header-heading"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                activeClassName="active header-heading"
                className="header-heading"
                to="/shelf"
              >
                Bookshelves
              </NavLink>
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
          <NavLink
            to="/"
            isActive={(match, location) => location.pathname === '/'}
          >
            <img
              src="https://res.cloudinary.com/dlnpuom7o/image/upload/v1697352812/Group_7731_ymqkll.png"
              alt="website logo"
              className="website-logo-image"
            />
          </NavLink>

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
              <li key="1">
                <NavLink
                  exact
                  to="/"
                  activeClassName="active header-heading"
                  className="header-heading"
                >
                  Home
                </NavLink>
              </li>

              <li key="2">
                <NavLink
                  exact
                  activeClassName="active header-heading"
                  className="header-heading"
                  to="/shelf"
                >
                  Bookshelves
                </NavLink>
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
