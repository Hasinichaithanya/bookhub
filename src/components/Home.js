import Cookies from 'js-cookie'
import {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import './home.css'
import Header from './Header'
import TopBooks from './TopBooks'
import Footer from './Footer'

const constants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    topbooks: [],
    apiStatus: constants.initial,
  }

  componentDidMount() {
    this.CallApis()
  }

  CallApis = async () => {
    this.setState({
      apiStatus: constants.inProgress,
    })
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(
      'https://apis.ccbp.in/book-hub/top-rated-books',
      options,
    )
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.books.map(book => ({
        id: book.id,
        authorName: book.author_name,
        coverPic: book.cover_pic,
        title: book.title,
      }))
      console.log(updatedData)
      this.setState({
        topbooks: updatedData,
        apiStatus: constants.success,
      })
    } else {
      this.setState({
        apiStatus: constants.failure,
      })
    }
  }

  renderFailure = () => (
    <div>
      <img
        src="https://res.cloudinary.com/dlnpuom7o/image/upload/v1697777828/Group_7522_dshfkz.png"
        alt="failure view"
      />
      <p>Something went wrong, Please try again.</p>
      <button type="button" onClick={this.CallApis}>
        Try Again
      </button>
    </div>
  )

  loadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderBooksSection = () => {
    const {topbooks} = this.state

    return (
      <div className="home-page-content">
        <h1 className="home-page-heading">Find Your Next Favorite Books? </h1>
        <p className="home-page-para">
          You are in the right place. Tell us what titles or genres you have
          enjoyed in the past, and we will give you surprisingly insightful
          recommendations.
        </p>
        <Link to="/shelf">
          <button type="button" className="find-books-mobile">
            Find Books
          </button>
        </Link>
        <div className="top-books-container">
          <div className="top-books-heading">
            <h3 className="heading">Top Rated Books</h3>
            <Link to="/shelf">
              <button type="button" className="find-books">
                Find Books
              </button>
            </Link>
          </div>
          <ul className="top-books-slick">
            <TopBooks topbooks={topbooks} />
          </ul>
        </div>
      </div>
    )
  }

  renderBooks = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case constants.success:
        return this.renderBooksSection()
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
      <div className="top-books-section">
        <Header />
        {this.renderBooks()}
        <Footer />
      </div>
    )
  }
}

export default Home
