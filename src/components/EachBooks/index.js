import {withRouter} from 'react-router-dom'
import './index.css'

const EachBooks = props => {
  const {eachBook} = props
  const {id, title, coverPic, authorName} = eachBook
  const onClickedTopRatedBook = () => {
    const {history} = props
    history.push(`/books/${id}`)
  }

  return (
    <div className="top-rated-book-item-container" key={id}>
      <button
        onClick={onClickedTopRatedBook}
        className="top-rated-card-btn"
        type="button"
      >
        <div className="top-rated-book-image-container">
          <img className="top-rated-book-image" src={coverPic} alt={title} />
        </div>
        <h1 className="top-rated-book-name">{title}</h1>
        <p className="top-rated-book-author">{authorName}</p>
      </button>
    </div>
  )
}

export default withRouter(EachBooks)
