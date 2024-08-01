import { Link } from "react-router-dom"

export default function Article({ article }) {
    return (
        <div className="allGames">
            <div className="allGames-info">
                <img src="../../images/default-article-image.jpg" />
                <h2>{article.title}</h2>
                <h5>{article.author}</h5>
                <Link to={`/articles/${article._id}`} className="details-button">
                    More...
                </Link>
            </div>
        </div>
    )
}