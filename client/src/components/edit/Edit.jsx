import { useState, useEffect, useContext } from "react"
import { articleContext } from "../../contexts/article";
import { modalContext } from "../../contexts/modal";
import * as articleService from "../../api/articles"
import { useNavigate, useParams } from "react-router-dom";

import { isValid } from "../../utils/validation";

import Modal from "../modal/Modal";

export default function Edit() {

    const articleID = useParams().articleID;
    const navigate = useNavigate();
    const { isOpen, setIsOpenWrapper } = useContext(modalContext);
    const [error, setError] = useState('');

    const { article, setArticleWrapper } = useContext(articleContext);
    const [editValues, setEditValues] = useState({
        title: '',
        author: '',
        content: ''
    })

    useEffect(() => {
        if (article) {
            setEditValues({
                title: article.title,
                author: article.author,
                content: article.content
            })
        } else {
            (async () => {
                try {
                    const selectedArticle = await articleService.getOne(articleID);
                    setArticleWrapper(selectedArticle);
                    setError('');
                } catch (err) {
                    console.error("Error fetching article:", err);
                    setError("Failed to load the article! Please try again!");
                    setIsOpenWrapper(true);
                }
            })()
        }
    }, [article]);

    const changeValuesHandler = (e) => {
        setEditValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if (isValid(editValues)) {
            try {
                const editedArticle = await articleService.edit(articleID, editValues);
                e.target.reset();
                setError('');
                navigate(`/articles/${editedArticle._id}`);
            } catch (err) {
                console.error("Error editing article:", err);
                setError("Failed to edit the article! Please try again!");
                setIsOpenWrapper(true);
            }
        } else {
            setError("All fields are required");
            setIsOpenWrapper(true);
        }
    }

    return (
        <section id="edit-article-page" className="auth">
            {isOpen && <Modal setIsOpen={setIsOpenWrapper} errMessage={error} />}
            <form onSubmit={submitHandler} id="edit">
                <div className="container">
                    <h1>Edit Article</h1>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Enter article title..."
                        onChange={changeValuesHandler}
                        value={editValues.title}
                    />
                    <label htmlFor="author">Author:</label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        placeholder="Enter article author..."
                        onChange={changeValuesHandler}
                        value={editValues.author}
                    />
                    <label htmlFor="content">Content:</label>
                    <textarea
                        name="content"
                        id="content"
                        onChange={changeValuesHandler}
                        value={editValues.content}
                    />
                    <input className="btn submit" type="submit" value="Edit Article" />
                </div>
            </form>
        </section>
    )
}