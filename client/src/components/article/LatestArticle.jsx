import { Link } from "react-router-dom"

export default function LatestArticle({ latestArticle }) {
    return (
        <div className="article">
            <div className="image-wrap">
                <img src="../../images/default-article-image.jpg" />
            </div>
            <h3>{latestArticle.title}</h3>
            <h5>{latestArticle.author}</h5>
            <div className="data-buttons">
                <Link to={`/articles/${latestArticle._id}`} className="btn details-btn">
                    More...
                </Link>
            </div>
        </div>
    )
}