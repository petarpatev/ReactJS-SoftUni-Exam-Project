import { useState, useEffect, useContext } from "react"
import { articleContext } from "../../contexts/article";
import * as articleService from "../../api/articles"
import { useNavigate, useParams } from "react-router-dom";

import { isValid } from "../../utils/validation";

export default function Edit() {

    const articleID = useParams().articleID;
    const navigate = useNavigate();

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
                const selectedArticle = await articleService.getOne(articleID);
                setArticleWrapper(selectedArticle);
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
            const editedArticle = await articleService.edit(articleID, editValues);
            e.target.reset();
            navigate(`/articles/${editedArticle._id}`);
        } else {
            alert("All fields are required");
        }
    }

    return (
        <section id="edit-page" className="auth">
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