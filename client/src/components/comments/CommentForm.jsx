import { useState, useContext } from "react"
import { userContext } from "../../contexts/user"
import { modalContext } from "../../contexts/modal";

import * as commentService from "../../api/comments"
import { isValid } from "../../utils/validation";

import Modal from "../modal/Modal";

export default function CommentForm({ articleId, onAddComment }) {

    const { user } = useContext(userContext);
    const {isOpen, setIsOpenWrapper} = useContext(modalContext);
    const [error, setError] = useState('');

    const [commentValues, setCommentValues] = useState({
        comment: '',
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
                }))
                setError('');
            } catch (err) {
                console.error("Failed to create comment:", err);
                setError("Failed to create comment! Please try again!");
                setIsOpenWrapper(true)
            }
        } else {
            setError("All fields are requeired");
            setIsOpenWrapper(true);
        }

    }

    return (
        <article className="create-comment">
            {isOpen && <Modal setIsOpen={setIsOpenWrapper} errMessage={error}/>}
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