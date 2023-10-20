import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import {Redirect} from 'react-router-dom'

import Footer from './Footer'
import Header from './Header'
import BookCard from './BookCard'

const constants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  searchFail: 'SEARCH_FAILURE',
}

class BookShelves extends Component {
  state = {
    books: '',
    bookshelfName: 'ALL',
    bookLabel: 'All',
    searchText: '',
    apiStatus: constants.initial,
  }

  componentDidMount() {
    this.getBooks()
  }

  getBooks = async () => {
    this.setState({
      apiStatus: constants.inProgress,
    })
    const {searchText, bookshelfName} = this.state
    const token = Cookies.get('jwt_token')
    console.log(token)
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const url = `https://apis.ccbp.in/book-hub/books?shelf=${bookshelfName}&search=${searchText}`
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      if (data.books.length === 0) {
        this.setState(
          {
            apiStatus: constants.searchFail,
          },
          this.renderBooks,
        )
      } else {
        const updatedData = data.books.map(each => ({
          id: each.id,
          title: each.title,
          coverPic: each.cover_pic,
          status: each.read_status,
          author: each.author_name,
          rating: each.rating,
        }))

        this.setState({
          books: updatedData,
          apiStatus: constants.success,
        })
      }
    } else {
      this.setState({
        apiStatus: constants.failure,
      })
    }
  }

  onChangeQuery = id => {
    const {bookshelvesList} = this.props
    const tab = bookshelvesList.find(each => each.id === id)

    this.setState(
      {
        bookshelfName: tab.value,
        bookLabel: tab.label,
      },
      this.getBooks,
    )
  }

  renderFilters = () => {
    const {bookshelvesList} = this.props
    return (
      <div>
        <h1>Bookshelves</h1>
        <ul>
          {bookshelvesList.map(each => (
            <li key={each.id}>
              <button type="button" onClick={() => this.onChangeQuery(each.id)}>
                {each.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderBooksSection = () => {
    const {books} = this.state
    return (
      <ul>
        {books.map(book => (
          <li key={book.id}>
            <BookCard book={book} />
          </li>
        ))}
      </ul>
    )
  }

  searchFailure = () => {
    const {searchText} = this.state
    return (
      <div>
        <img
          src="https://res.cloudinary.com/dlnpuom7o/image/upload/v1697703414/Asset_1_1_1_qaeqzd.png"
          alt="no books"
        />
        <p>Your search for {searchText} did not find any matches.</p>
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
      <button type="button" onClick={this.getBooks}>
        Try Again
      </button>
    </div>
  )

  loadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderBooks = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case constants.success:
        return this.renderBooksSection()
      case constants.failure:
        return this.renderFailure()
      case constants.inProgress:
        return this.loadingView()
      case constants.searchFail:
        return this.searchFailure()
      default:
        return null
    }
  }

  onChangeInput = e => {
    this.setState({
      searchText: e.target.value,
    })
  }

  render() {
    const {searchText, bookLabel} = this.state
    const token = Cookies.get('jwt_token')
    if (token === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <>
        <Header />
        <h1>{bookLabel} Books</h1>
        <input
          type="search"
          value={searchText}
          onChange={this.onChangeInput}
          placeholder="Search"
        />
        <button type="button" testid="searchButton" onClick={this.getBooks}>
          <BsSearch />
        </button>
        {this.renderFilters()}
        {this.renderBooks()}
        <Footer />
      </>
    )
  }
}
export default BookShelves
