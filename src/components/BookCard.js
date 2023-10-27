import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'
import './bookcard.css'

class BookCard extends Component {
  renderBook = () => {
    const {book} = this.props
    const {id, title, author, coverPic, rating, status} = book
    return (
      <div className="book-card">
        <Link to={`/books/${id}`}>
          <img src={coverPic} alt={title} className="book-image" />
        </Link>
        <div className="book-details">
          <h1 className="book-title">{title}</h1>
          <p className="book-author">{author}</p>
          <p className="book-rating">
            Avg Rating: <BsFillStarFill className="star" />
            {rating}
          </p>
          <p className="book-status">
            Status: <span>{status}</span>
          </p>
        </div>
      </div>
    )
  }

  render() {
    return <div>{this.renderBook()}</div>
  }
}

export default BookCard
