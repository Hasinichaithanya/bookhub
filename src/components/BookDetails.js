import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsFillStarFill} from 'react-icons/bs'
import BarLoader from 'react-spinners/BarLoader'
import {Redirect} from 'react-router-dom'

import Footer from './Footer'
import Header from './Header'
import './bookdetails.css'

const constants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class BookShelves extends Component {
  state = {
    book: {},
    apiStatus: constants.initial,
  }

  componentDidMount() {
    this.getBookDetails()
  }

  getBookDetails = async () => {
    this.setState({
      apiStatus: constants.inProgress,
    })
    const token = Cookies.get('jwt_token')

    const {match} = this.props
    const {params} = match
    const {id} = params
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const bUrl = `https://apis.ccbp.in/book-hub/books/${id}`
    const response = await fetch(bUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const details = data.book_details
      console.log(details)
      const updatedBook = {
        id: details.id,
        author: details.author_name,
        aboutAuthor: details.about_author,
        pic: details.cover_pic,
        rating: details.rating,
        title: details.title,
        aboutBook: details.about_book,
        status: details.read_status,
      }
      this.setState({book: updatedBook, apiStatus: constants.success})
    } else {
      this.setState({
        apiStatus: constants.failure,
      })
    }
  }

  renderBook = () => {
    const {book} = this.state
    const {title, status, aboutAuthor, aboutBook, author, rating, pic} = book
    return (
      <div className="book-details-main-container">
        <div className="book-details-card">
          <div className="book-details-top-section">
            <img src={pic} alt={title} className="book-details-image" />
            <div className="single-book-details">
              <h1 className="book-title-details">{title}</h1>
              <p className="book-author-details">{author}</p>
              <p className="book-rating-details">
                Avg Rating: <BsFillStarFill className="star" />
                {rating}
              </p>
              <p className="book-status-details">
                Status: <span>{status}</span>
              </p>
            </div>
          </div>
          <hr />
          <div className="details-details">
            <h1>About Author</h1>
            <p>{aboutAuthor}</p>
            <h1>About Book</h1>
            <p>{aboutBook}</p>
          </div>
        </div>
      </div>
    )
  }

  renderFailure = () => (
    <div>
      <img
        src="https://res.cloudinary.com/dlnpuom7o/image/upload/v1697777828/Group_7522_dshfkz.png"
        alt="failure view"
      />
      <p>Something went wrong, Please try again.</p>
      <button
        type="button"
        onClick={this.getBookDetails}
        className="try-again-btn"
      >
        Try Again
      </button>
    </div>
  )

  loadingView = () => (
    <div className="loader-container" testid="loader">
      <BarLoader color="green" />
    </div>
  )

  renderViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case constants.success:
        return this.renderBook()
      case constants.failure:
        return this.renderFailure()
      case constants.inProgress:
        return this.loadingView()
      default:
        return null
    }
  }

  render() {
    const token = Cookies.get('jwt_token')
    if (token === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <>
        <Header />

        <div className="book-details-page">{this.renderViews()}</div>

        <Footer />
      </>
    )
  }
}

export default BookShelves
