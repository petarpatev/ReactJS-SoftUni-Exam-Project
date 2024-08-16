import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom";
import { modalContext } from "../../contexts/modal";

import * as articleService from "../../api/articles"
import { isValid } from "../../utils/validation";

import Modal from "../modal/Modal";

export default function Create() {

    const navigate = useNavigate();
    const { isOpen, setIsOpenWrapper } = useContext(modalContext);
    const [error, setError] = useState('');

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
            try {
                await articleService.create(createValues);
                e.target.reset();
                setError('');
                navigate('/catalog/articles');
            } catch (err) {
                console.log(err);
                setError('Game creation failed! Please try again');
                setIsOpenWrapper(true);
            }
        } else {
            setError('All fields are required');
            setIsOpenWrapper(true);
        }

    }

    return (
        <section id="create-article-page" className="auth">
            {isOpen && <Modal setIsOpen={setIsOpenWrapper} errMessage={error} />}
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