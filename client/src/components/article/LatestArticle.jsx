import { Link } from "react-router-dom"

export default function LatestArticle({ latestArticle }) {
    return (
        <div className="game">
            <div className="image-wrap">
                <img src="../../images/default-article-image.jpg" />
            </div>
            <h3>{latestArticle.title}</h3>
            <div className="rating">
                <span>☆</span>
                <span>☆</span>
                <span>☆</span>
                <span>☆</span>
                <span>☆</span>
            </div>
            <h5>{latestArticle.author}</h5>
            <div className="data-buttons">
                <Link to={`/articles/${latestArticle._id}`} className="btn details-btn">
                    More...
                </Link>
            </div>
        </div>
    )
}