import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsFillStarFill} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import {Redirect} from 'react-router-dom'

import Footer from './Footer'
import Header from './Header'

class BookShelves extends Component {
  state = {
    book: {},
    apiStatus: '',
  }

  componentDidMount() {
    this.getBookDetails()
  }

  getBookDetails = async () => {
    this.setState({
      apiStatus: 'inProgress',
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
      this.setState({book: updatedBook, apiStatus: 'completed'})
    }
  }

  render() {
    const {book, apiStatus} = this.state
    const {title, status, aboutAuthor, aboutBook, author, rating, pic} = book
    const token = Cookies.get('jwt_token')
    if (token === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <>
        <Header />
        {apiStatus === 'completed' ? (
          <div>
            <img src={pic} alt={title} />
            <h1>{title}</h1>
            <p>{author}</p>
            <p>
              Avg Rating:{rating}
              <BsFillStarFill />
            </p>
            <p>Status: {status}</p>
            <h1>About Author</h1>
            <p>{aboutAuthor}</p>
            <h1>About Book</h1>
            <p>{aboutBook}</p>
          </div>
        ) : (
          <div className="loader-container" testid="loader">
            <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
          </div>
        )}

        <Footer />
      </>
    )
  }
}
export default BookShelves
