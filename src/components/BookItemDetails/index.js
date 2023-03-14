// import {Component} from 'react'

// import Loader from 'react-loader-spinner'

// import Cookies from 'js-cookie'

// import {BsFillStarFill, BsFillHeartFill} from 'react-icons/bs'

// const bookDetailsApiStatuses = {
//   initial: 'INITIAL',
//   success: 'SUCCESS',
//   failure: 'FAILURE',
//   inProgress: 'IN_PROGRESS',
// }

// class BookItemDetails extends Component {
//   state = {
//     bookDetailsData: {},
//     bookDetailsApiStatus: bookDetailsApiStatuses.initial,
//   }

//   componentDidMount() {
//     this.getBookDetailsApi()
//   }

//   getBookDetailsApi = async () => {
//     this.setState({bookDetailsApiStatus: bookDetailsApiStatuses.inProgress})

//     const {match} = this.props
//     const {params} = match
//     const {id} = params
//     const bookDetailsApi = `https://apis.ccbp.in/book-hub/books/${id}`
//     const jwtToken = Cookies.get('jwt_token')
//     const options = {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${jwtToken}`,
//       },
//     }

//     const response = await fetch(bookDetailsApi, options)

//     if (response.ok === true) {
//       const fetchedData = await response.json()
//       const updatedData = {
//         bookDetails: {
//           id: fetchedData.book_details.id,
//           authorName: fetchedData.book_details.author_name,
//           coverPic: fetchedData.book_details.cover_pic,
//           aboutBook: fetchedData.book_details.about_book,
//           rating: fetchedData.book_details.rating,
//           aboutAuthor: fetchedData.book_details.about_author,
//           readStatus: fetchedData.book_details.read_status,
//         },
//       }
//       this.setState({
//         bookDetailsData: updatedData,
//         bookDetailsApiStatus: bookDetailsApiStatuses.success,
//       })
//     } else {
//       this.setState({bookDetailsApiStatus: bookDetailsApiStatuses.failure})
//     }
//   }

//   onClickRetry = () => {
//     this.getBookDetailsApi()
//   }

//   renderBookDetailsInProgressView = () => (
//     <div className="loader-container" testid="loader">
//       <Loader type="TailSpin" color="#8284C7" height={32} width={32} />
//     </div>
//   )

//   renderBookDetailsFailureView = () => (
//     <div className="top-rated-books-failure-container">
//       <img
//         className="top-rated-books-failure-image"
//         src="https://res.cloudinary.com/dynx88ls1/image/upload/v1645337269/Group_7522_vwrftq.png"
//         alt="failure view"
//       />
//       <p className="top-rated-books-failure-heading">
//         Something Went Wrong. Please try again.
//       </p>
//       <button
//         className="top-rated-books-failure-btn"
//         onClick={this.onClickRetry}
//         type="button"
//       >
//         Try Again
//       </button>
//     </div>
//   )

//   renderBookDetailsSuccessView = () => {
//     const {bookDetailsData} = this.state
//     const {bookDetails} = bookDetailsData
//     const {
//       authorName,
//       coverPic,
//       aboutBook,
//       rating,
//       readStatus,
//       aboutAuthor,
//       title,
//       id,
//     } = bookDetails

//     return (
//       <div className="book-details-card-container">
//         <div className="book-details-container">
//           <img className="book-details-image" alt={title} src={coverPic} />
//           <div className="container1">
//             <h1 className="book-title" key={title}>
//               {title}
//             </h1>
//             <p className="book-details-author-name">{authorName}</p>
//             <div className="book-details-rating-container">
//               <p className="book-details-abg-rating-heading">Avg rating</p>
//               <BsFillStarFill className="book-details-star-icon" />
//               <p className="book-details-rating">{rating}</p>
//             </div>
//             <p className="book-details-status-heading">
//               Status: <span className="book-details-status">{readStatus}</span>
//             </p>
//           </div>
//         </div>
//         <div className="container2">
//           <hr name="horizontal-line" />
//           <div>
//             <h1 className="about-heading">About Author</h1>
//             <p className="about-paragraph">{aboutAuthor}</p>
//           </div>
//           <div>
//             <h1 className="about-heading">About Book</h1>
//             <p className="about-paragraph">{aboutBook}</p>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   renderBookDetails = () => {
//     const {bookDetailsApiStatus} = this.state

//     switch (bookDetailsApiStatus) {
//       case bookDetailsApiStatuses.success:
//         return <> {this.renderBookDetailsSuccessView()} </>
//       case bookDetailsApiStatuses.inProgress:
//         return <>{this.renderBookDetailsInProgressView()}</>
//       case bookDetailsApiStatuses.failure:
//         return <>{this.renderBookDetailsFailureView()}</>
//       default:
//         return null
//     }
//   }

//   render() {
//     return (
//       <>
//         <div className="book-details-bg-container">
//           {this.renderBookDetails()}
//         </div>
//       </>
//     )
//   }
// }

// export default BookItemDetails

import {Component} from 'react'
import Cookies from 'js-cookie'

class BookItemDetails extends Component {
  componentDidMount = () => {
    this.getThisBookApi()
  }

  getThisBookApi = async () => {
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
        bookDetails: {
          id: fetchedData.book_details.id,
          authorName: fetchedData.book_details.author_name,
          coverPic: fetchedData.book_details.cover_pic,
          aboutBook: fetchedData.book_details.about_book,
          rating: fetchedData.book_details.rating,
          aboutAuthor: fetchedData.book_details.about_author,
          readStatus: fetchedData.book_details.read_status,
        },
      }
    }
  }

  render() {
    return <div>ss</div>
  }
}

export default BookItemDetails
