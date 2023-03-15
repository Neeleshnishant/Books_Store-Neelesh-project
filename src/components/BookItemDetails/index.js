import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFillStarFill} from 'react-icons/bs'
import './index.css'

const renderThisView = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inprogress: 'INPROGRESS',
  failure: 'FAILURE',
}

class BookItemDetails extends Component {
  state = {
    bookDetails: {},
    bookApiStatus: renderThisView.initial,
  }

  componentDidMount = () => {
    this.getThisBookApi()
  }

  renderProgressView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  getThisBookApi = async () => {
    this.setState({bookApiStatus: renderThisView.progress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const Token = Cookies.get('jwt_token')
    const option = {
      method: 'GET',
      headers: {
        Authorization: `BEARER ${Token}`,
      },
    }
    const response = await fetch(
      `https://apis.ccbp.in/book-hub/books/${id}`,
      option,
    )
    const fetchedData = await response.json()
    if (response.ok === true) {
      const updatedData = {
        id: fetchedData.book_details.id,
        authorName: fetchedData.book_details.author_name,
        coverPic: fetchedData.book_details.cover_pic,
        aboutBook: fetchedData.book_details.about_book,
        rating: fetchedData.book_details.rating,
        aboutAuthor: fetchedData.book_details.about_author,
        readStatus: fetchedData.book_details.read_status,
      }
      console.log(updatedData.authorName)
      this.setState({
        bookDetails: updatedData,
        bookApiStatus: renderThisView.success,
      })
    } else {
      this.setState({bookApiStatus: renderThisView.failure})
    }
  }

  renderSuccessView = () => {
    const {bookDetails} = this.state

    const {
      authorName,
      coverPic,
      aboutBook,
      rating,
      readStatus,
      aboutAuthor,
      title,
      //   id,
    } = bookDetails

    return (
      <div className="book-details-card-container">
        <div className="book-details-container">
          <img className="book-details-image" alt={title} src={coverPic} />
          <div className="container1">
            <h1 className="book-title" key={title}>
              {title}
            </h1>
            <p className="book-details-author-name">{authorName}</p>
            <div className="book-details-rating-container">
              <p className="book-details-abg-rating-heading">Avg rating</p>
              <BsFillStarFill className="book-details-star-icon" />
              <p className="book-details-rating">{rating}</p>
            </div>
            <p className="book-details-status-heading">
              Status: <span className="book-details-status">{readStatus}</span>
            </p>
          </div>
        </div>
        <div className="container2">
          <hr name="horizontal-line" />
          <div>
            <h1 className="about-heading">About Author</h1>
            <p className="about-paragraph">{aboutAuthor}</p>
          </div>
          <div>
            <h1 className="about-heading">About Book</h1>
            <p className="about-paragraph">{aboutBook}</p>
          </div>
        </div>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="top-rated-books-failure-container">
      <img
        className="top-rated-books-failure-image"
        src="https://res.cloudinary.com/dynx88ls1/image/upload/v1645337269/Group_7522_vwrftq.png"
        alt="failure view"
      />
      <p className="top-rated-books-failure-heading">
        Something Went Wrong. Please try again.
      </p>
      <button
        className="top-rated-books-failure-btn"
        onClick={this.onClickRetry}
        type="button"
      >
        Try Again
      </button>
    </div>
  )

  renderBookDetails = () => {
    const {bookApiStatus} = this.state
    switch (bookApiStatus) {
      case renderThisView.progress:
        return <div>{this.renderProgressView()}</div>
      case renderThisView.success:
        return <div>{this.renderSuccessView()}</div>
      case renderThisView.failure:
        return <div>{this.renderFailureView()}</div>
      default:
        return null
    }
  }

  render() {
    return (
      <div className="book-details-bg-container">
        {this.renderBookDetails()}
      </div>
    )
  }
}

export default BookItemDetails
