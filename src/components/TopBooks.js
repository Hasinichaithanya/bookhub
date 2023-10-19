import {Component} from 'react'
import Slider from 'react-slick'
import './topbooks.css'

class TopBooks extends Component {
  renderSlider = () => {
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
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
              <img className="logo-image" src={coverPic} alt="cover pic" />
              <h1 className="heading">{title}</h1>
              <p>{authorName}</p>
            </div>
          )
        })}
      </Slider>
    )
  }

  render() {
    return (
      <div className="main-container">
        <div className="slick-container">{this.renderSlider()}</div>
      </div>
    )
  }
}

export default TopBooks
