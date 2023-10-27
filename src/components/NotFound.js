import {Link} from 'react-router-dom'
import './notfound.css'

const NotFound = () => (
  <div className="not-found">
    <h1>Page Not Found</h1>
    <p>we are sorry, the page you requested could not be found</p>
    <img
      src="https://res.cloudinary.com/dlnpuom7o/image/upload/v1697353337/Asset_1_1_bwiiwi.png"
      alt="not found"
    />
    <Link to="/">
      <button type="button" className="btn">
        Go Back to Home
      </button>
    </Link>
  </div>
)
export default NotFound
