import { useEffect, useState, useContext } from "react"
import { useParams, Link, useNavigate } from "react-router-dom";
import { userContext } from "../../contexts/user";
import { articleContext } from "../../contexts/article";

import * as articleService from "../../api/articles"
import * as commentService from "../../api/comments"

import CommentForm from "../comments/CommentForm";

export default function Details() {

    const navigate = useNavigate();

    const { user } = useContext(userContext);
    const { article, setArticleWrapper } = useContext(articleContext);

    const articleID = useParams().articleID;
    const [isOwner, setIsOwner] = useState(false);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        (async () => {
            const [selectedArticle, comments] = await Promise.all([
                articleService.getOne(articleID),
                commentService.getByArticleId(articleID)
            ])
            setArticleWrapper(selectedArticle);
            setComments(comments);
            if (user && selectedArticle) {
                setIsOwner(user._id === selectedArticle._ownerId);
            }
        })()
    }, [articleID, user])

    if (!article) {
        return <div>Loading...</div>
    }

    function onAddComment(newComment) {
        setComments(state => ([
            ...state,
            newComment
        ]))
    }

    async function deleteHandler() {
        const choice = confirm('Are you sure you want to delete this article?');
        if (choice) {
            await articleService.remove(article._id);
            navigate('/');
        }
    }

    return (
        <section id="game-details">
            <h1>Article Details</h1>
            <div className="info-section">
                <div className="game-header">
                    <img className="game-img" src="../../images/default-article-image.jpg" alt={article.title} />
                    <h1>{article.title}</h1>
                    <span className="levels">{article.author}</span>
                    {/* <p className="type">{article.author}</p> */}
                </div>
                <p className="text">{article.content}</p>

                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        {comments.length > 0
                            ? comments.map(x => <li key={x._id} className="comment">
                                <p>{x.author}: {x.comment}.</p>
                            </li>)
                            : <p className="no-comment">No comments.</p>
                        }
                    </ul>
                </div>

                {isOwner &&
                    <div className="buttons">
                        <Link to={`/articles/${article._id}/edit`} className="button">
                            Edit
                        </Link>
                        <Link onClick={deleteHandler} to="#" className="button">
                            Delete
                        </Link>
                    </div>
                }
            </div>

            {(!isOwner && user) && <CommentForm articleId={articleID} onAddComment={onAddComment} />}

        </section>
    )
}