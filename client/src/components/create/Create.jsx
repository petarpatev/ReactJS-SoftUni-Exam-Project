import { useState } from "react"
import { useNavigate } from "react-router-dom";

import * as articleService from "../../api/articles"
import { isValid } from "../../utils/validation";

export default function Create() {

    const navigate = useNavigate();

    const [createValues, setCreateValues] = useState({
        title: '',
        author: '',
        content: ''
    });

    const changeValuesHandler = (e) => {
        setCreateValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        if (isValid(createValues)) {
            await articleService.create(createValues);
            e.target.reset();
            navigate('/catalog/articles');
        } else {
            alert("All fields are requeired")
        }

    }

    return (
        <section id="create-page" className="auth">
            <form onSubmit={submitHandler} id="create">
                <div className="container">
                    <h1>Create Article</h1>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Enter article title..."
                        onChange={changeValuesHandler}
                        value={createValues.title}
                    />
                    <label htmlFor="author">Author:</label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        placeholder="Enter article author..."
                        onChange={changeValuesHandler}
                        value={createValues.author}
                    />
                    <label htmlFor="content">Content:</label>
                    <textarea
                        name="content"
                        id="content"
                        onChange={changeValuesHandler}
                        value={createValues.content}
                    />
                    <input className="btn submit" type="submit" value="Create Article" />
                </div>
            </form>
        </section>
    )
}