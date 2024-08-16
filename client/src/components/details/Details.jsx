import { useEffect, useState, useContext } from "react"
import { useParams, Link, useNavigate } from "react-router-dom";
import { userContext } from "../../contexts/user";
import { articleContext } from "../../contexts/article";
import { modalContext } from "../../contexts/modal";

import * as articleService from "../../api/articles"
import * as commentService from "../../api/comments"
import * as likeService from "../../api/likes"

import CommentForm from "../comments/CommentForm";
import Modal from "../modal/Modal";

export default function Details() {

    const navigate = useNavigate();

    const { user } = useContext(userContext);
    const { article, setArticleWrapper } = useContext(articleContext);
    const { isOpen, setIsOpenWrapper } = useContext(modalContext);

    const articleID = useParams().articleID;
    const [isOwner, setIsOwner] = useState(false);
    const [isLikedByUser, setIsLikedByUser] = useState(false);
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const [selectedArticle, comments, likes] = await Promise.all([
                    articleService.getOne(articleID),
                    commentService.getByArticleId(articleID),
                    likeService.getByArticleId(articleID)
                ])
                setArticleWrapper(selectedArticle);
                setComments(comments);
                setLikes(likes);
                if (user && selectedArticle) {
                    setIsOwner(user._id === selectedArticle._ownerId);
                    setIsLikedByUser(likes.some(like => like._ownerId === user._id));
                }
                setError('');
            } catch (err) {
                console.error("Error fetching article details:", err);
                setError("Failed to load article details! Please try again!");
                setIsOpenWrapper(true);
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

    async function onClickLike(e) {
        e.preventDefault();
        if (!isLikedByUser) {
            try {
                const newLike = {
                    articleId: articleID,
                }
                await likeService.create(newLike);
                setLikes(state => ([
                    ...state,
                    newLike
                ]))
                setIsLikedByUser(true);
                setError('');
            } catch (err) {
                console.error("Error liking article:", err);
                setError("Failed to like the article! Please try again.");
                setIsOpenWrapper(true);
            }
        }
    }

    async function deleteHandler() {
        const choice = confirm('Are you sure you want to delete this article?');
        if (choice) {
            try {
                await articleService.remove(article._id);
                navigate('/');
                setError('');
            } catch (err) {
                console.error("Error deleting article:", err);
                setError("Failed to delete the article! Please try again!");
                setIsOpenWrapper(true);
            }
        }
    }

    return (
        <section id="article-details">
            <h1>Article Details</h1>
            {isOpen && <Modal setIsOpen={setIsOpenWrapper} errMessage={error} />}
            <div className="info-section">
                <div className="article-header">
                    <img className="article-img" src="../../images/default-article-image.jpg" alt={article.title} />
                    <h1>{article.title}</h1>
                    <span className="article-author">{article.author}</span>
                    {(!isOwner && user) && <button onClick={onClickLike} className="likeBtn">Like</button>}
                </div>
                <span className="article-likes">Likes: {likes.length}</span>
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