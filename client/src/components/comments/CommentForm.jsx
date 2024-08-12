import { useState, useContext } from "react"
import { userContext } from "../../contexts/user"

import * as commentService from "../../api/comments"
import { isValid } from "../../utils/validation";

export default function CommentForm({ articleId, onAddComment }) {

    const { user } = useContext(userContext);

    const [commentValues, setCommentValues] = useState({
        comment: '',
        // author: ''
    })

    const changeValueHandler = (e) => {
        setCommentValues(state => ({
            ...state,
            comment: e.target.value
        }))
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if (isValid(commentValues)) {
            try {
                const newComment = await commentService.create({
                    articleId: articleId,
                    comment: commentValues.comment,
                    author: user.email
                })

                onAddComment(newComment);
                e.target.reset();
                setCommentValues(state => ({
                    ...state,
                    comment: "",
                    // author: ""
                }))
            } catch (err) {
                console.error("Failed to create comment:", err);
                alert("Failed to create comment! Please try again!");
            }
        } else {
            alert("All fields are requeired")
        }

    }

    return (
        <article className="create-comment">
            <label>Add new comment:</label>
            <form onSubmit={submitHandler} className="form">
                <textarea
                    name="comment"
                    placeholder="Comment......"
                    onChange={changeValueHandler}
                    value={commentValues.comment}
                />
                <input className="btn submit" type="submit" value="Add Comment" />
            </form>
        </article>
    )
}