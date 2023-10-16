import './Login.css'

const Login = () => (
  <div className="login-container">
    <img
      src="https://res.cloudinary.com/dlnpuom7o/image/upload/v1697349805/Rectangle_1467_sgipdg.png"
      alt="website login"
      className="website-login-image"
    />
    <div className="login-sub-container">
      <img
        src="https://res.cloudinary.com/dlnpuom7o/image/upload/v1697352812/Group_7731_ymqkll.png"
        alt="login website logo"
        className="website-logo-image"
      />
      <div className="input-container">
        <label htmlFor="username">Username*</label>
        <br />
        <input type="text" placeholder="Username" id="username" />
      </div>
      <div className="input-container">
        <label htmlFor="password">Password*</label>
        <br />
        <input type="password" placeholder="password" id="password" />
      </div>
      <div>
        <button type="button">Login</button>
      </div>
    </div>
  </div>
)
export default Login
