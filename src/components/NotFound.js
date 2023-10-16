import {Link} from 'react-router-dom'

const NotFound = () => (
  <div>
    <h1>Page Not Found</h1>
    <p>we are sorry, the page you requested could not be found</p>
    <img
      src="https://res.cloudinary.com/dlnpuom7o/image/upload/v1697353337/Asset_1_1_bwiiwi.png"
      alt="not found"
    />
    <Link to="/">
      <button type="button">Go Back to Home</button>
    </Link>
  </div>
)
export default NotFound
