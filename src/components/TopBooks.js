import {Component} from 'react'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'
import './topbooks.css'

class TopBooks extends Component {
  renderSlider = () => {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }
    const {topbooks} = this.props
    return (
      <Slider {...settings}>
        {topbooks.map(each => {
          const {id, coverPic, title, authorName} = each
          return (
            <div className="slick-item" key={id}>
              <Link to={`/books/${id}`}>
                <img className="top-book" src={coverPic} alt={title} />
              </Link>
              <h1 className="top-book-heading">{title}</h1>
              <p className="author-name">{authorName}</p>
            </div>
          )
        })}
      </Slider>
    )
  }

  render() {
    return <div className="slick-container">{this.renderSlider()}</div>
  }
}

export default TopBooks
