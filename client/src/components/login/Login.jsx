import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { userContext } from "../../contexts/user";
import { modalContext } from "../../contexts/modal";
import * as authService from '../../api/auth'
import { isValid } from "../../utils/validation";

import Modal from "../modal/Modal";


export default function Login() {

    const navigate = useNavigate();
    const { setUserWrapper } = useContext(userContext);
    const { isOpen, setIsOpenWrapper } = useContext(modalContext);
    const [error, setError] = useState('');

    const [loginValues, setLoginValues] = useState({
        email: '',
        password: ''
    })

    const logValuesChangeHandler = (e) => {
        e.preventDefault();
        setLoginValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    const loginSubmitHandler = async (e) => {
        e.preventDefault();
        if (isValid(loginValues)) {
            try {
                const user = await authService.login(loginValues.email, loginValues.password);
                setUserWrapper(user);
                e.target.reset();
                setError('');
                navigate('/');
            } catch (err) {
                console.error("Login failed:", err);
                setError("Failed to logged-in! Please try again");
                setIsOpenWrapper(true);
            }
        } else {
            setError('All fields are required');
            setIsOpenWrapper(true);
        }
    }

    return (
        <section id="login-page" className="auth">
            {isOpen && <Modal setIsOpen={setIsOpenWrapper} errMessage={error} />}
            <form onSubmit={loginSubmitHandler} id="login">
                <div className="container">
                    <h1>Login</h1>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={logValuesChangeHandler}
                        value={loginValues.email}
                    />
                    <label htmlFor="login-password">Password:</label>
                    <input type="password"
                        id="login-password"
                        name="password"
                        onChange={logValuesChangeHandler}
                        value={loginValues.password}
                    />
                    <input type="submit" className="btn submit" value="Login" />
                </div>
            </form>
        </section>
    )
}