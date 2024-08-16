import { useContext, useEffect, useState } from "react"
import { membersContext } from "../../contexts/members";
import { modalContext } from "../../contexts/modal";
import { useParams } from "react-router-dom";

import * as likeService from "../../api/likes"
import * as commentService from "../../api/comments"

import Modal from "../modal/Modal";

export default function MemberDetailsCard() {
    const [likes, setLikes] = useState([]);
    const [comments, setComments] = useState([]);
    const selectedMemberId = useParams().memberId;
    const { members } = useContext(membersContext);
    const selectedMember = members.filter(m => m._id === selectedMemberId)[0];

    const { isOpen, setIsOpenWrapper } = useContext(modalContext);
    const [error, setError] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const [likes, comments] = await Promise.all([
                    likeService.getByMemberId(selectedMemberId),
                    commentService.getByMemberId(selectedMemberId)
                ])
                setLikes(likes);
                setComments(comments);
                setError('');
            } catch (err) {
                console.error("Error taking likes and comments:", err);
                setError("Failed to load member's comments and likes! Please try again.");
                setIsOpenWrapper(true);
            }
        })()
    }, [selectedMemberId])

    return (
        <>
            {isOpen && <Modal setIsOpen={setIsOpenWrapper} errMessage={error} />}
            <h1 style={{ marginBottom: "30px", textAlign: "center" }} >{selectedMember.username} Details</h1>
            <span className="member-likes">Likes: {likes.length}</span>
            <h3 style={{ marginTop: "30px" }} >Comments:</h3>
            <div className="member-comments-wrapper">
                {comments.length > 0
                    ? comments.map(c => <li key={c._id} className="member-details-comment">
                        <p className="comment-content">{c.author}: {c.comment}.</p>
                    </li>
                    )
                    : <p>No comments yet</p>
                }
            </div>
        </>
    )
}