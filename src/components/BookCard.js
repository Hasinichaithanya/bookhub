import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'

class BookCard extends Component {
  renderBook = () => {
    const {book} = this.props
    const {id, title, author, coverPic, rating, status} = book
    return (
      <Link to={`/books/${id}`}>
        <div>
          <img src={coverPic} alt={title} />
          <h1>{title}</h1>
          <p>{author}</p>
          <p>
            Avg Rating:{rating}
            <BsFillStarFill />
          </p>
          <p>Status: {status}</p>
        </div>
      </Link>
    )
  }

  render() {
    return <div>{this.renderBook()}</div>
  }
}

export default BookCard
