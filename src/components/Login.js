import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './Login.css'

const constants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    apiStatus: constants.initial,
  }

  onSuccess = token => {
    const {history} = this.props
    Cookies.set('jwt_token', token, {expires: 10})
    history.replace('/')
  }

  onFailure = errorMsg => {
    this.setState({
      errorMsg,
      apiStatus: constants.failure,
    })
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    if (username !== '' && password !== '') {
      const apiUrl = 'https://apis.ccbp.in/login'
      const options = {
        method: 'POST',
        body: JSON.stringify(userDetails),
      }
      const response = await fetch(apiUrl, options)
      const data = await response.json()
      if (response.ok === true) {
        this.onSuccess(data.jwt_token)
      } else {
        this.onFailure(data.error_msg)
      }
    } else if (username === '' || password === '') {
      this.setState({
        apiStatus: constants.failure,
        errorMsg: 'username and password are required',
      })
    }
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeUsername = e => {
    this.setState({username: e.target.value})
  }

  render() {
    const {password, username, errorMsg, apiStatus} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <img
          src="https://res.cloudinary.com/dlnpuom7o/image/upload/v1697349805/Rectangle_1467_sgipdg.png"
          alt="website login"
          className="website-login-image"
        />
        <img
          src="https://res.cloudinary.com/dlnpuom7o/image/upload/v1698123026/Ellipse_99_io6kpm.png"
          alt="website login"
          className="mobile-website-login-image"
        />
        <div className="login-sub-container">
          <img
            src="https://res.cloudinary.com/dlnpuom7o/image/upload/v1697352812/Group_7731_ymqkll.png"
            alt="login website logo"
            className="website-logo-image"
          />
          <form onSubmit={this.onSubmitForm}>
            <div className="input-container">
              <label htmlFor="username">Username*</label>
              <br />
              <input
                type="text"
                placeholder="Username"
                id="username"
                value={username}
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="input-container">
              <label htmlFor="password">Password*</label>
              <br />
              <input
                type="password"
                placeholder="Password"
                id="password"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>
            {apiStatus === constants.failure && (
              <p className="error_msg">*{errorMsg}</p>
            )}
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}
export default Login
