import Cookies from 'js-cookie'
import {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import './home.css'
import Header from './Header'
import TopBooks from './TopBooks'
import Footer from './Footer'

class Home extends Component {
  state = {
    topbooks: [],
  }

  componentDidMount() {
    this.CallApis()
  }

  CallApis = async () => {
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
      })
    }
  }

  render() {
    const {topbooks} = this.state
    const token = Cookies.get('jwt_token')
    if (token === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <div>
        <Header />
        <h1>Find Your Next Favorite Books? </h1>
        <p>
          You are in the right place. Tell us what titles or genres you have
          enjoyed in the past, and we will give you surprisingly insightful
          recommendations.
        </p>
        <div>
          <h3>Top Rated Books</h3>
          <Link to="/shelf">
            <button type="button">Find Books</button>
          </Link>

          {topbooks.length > 0 ? (
            <TopBooks topbooks={topbooks} />
          ) : (
            <div className="loader-container" testid="loader">
              <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
            </div>
          )}
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home
