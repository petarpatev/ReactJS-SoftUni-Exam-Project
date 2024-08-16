import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { userContext } from "../../contexts/user";
import { membersContext } from "../../contexts/members"
import { modalContext } from "../../contexts/modal";

import * as authService from '../../api/auth'
import { isValid, equalPasswords } from "../../utils/validation";
import Modal from "../modal/Modal";


export default function Register() {

    const navigate = useNavigate();
    const { setUserWrapper } = useContext(userContext);
    const { setMembersWrapper } = useContext(membersContext);
    const {isOpen, setIsOpenWrapper} = useContext(modalContext);

    const [registerValues, setRegisterValues] = useState({
        email: '',
        username: '',
        password: '',
        ['confirm-password']: ''
    })

    const [error, setError] = useState('');


    const regValuesChangeHandler = (e) => {
        e.preventDefault();
        setRegisterValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    const registerSubmitHandler = async (e) => {
        e.preventDefault();
        if (!isValid(registerValues)) {
            setError('All fields are required');
            setIsOpenWrapper(true);
            return;
        }
        if (!equalPasswords(registerValues.password, registerValues["confirm-password"])) {
            setError("Password don't match");
            setIsOpenWrapper(true)
            return;
        }
        try {
            const user = await authService.register(registerValues.email, registerValues.password);
            setUserWrapper(user);
            setMembersWrapper({
                email: registerValues.email,
                username: registerValues.username,
                _id: user._id
            });
            e.target.reset();
            setError('');
            navigate('/');
        } catch (err) {
            console.error("Registration failed:", err);
            setError("Registration failed. Please try again");
            setIsOpenWrapper(true)
        }
    }

    return (
        <section id="register-page" className="content auth">
            <form onSubmit={registerSubmitHandler} id="register">
                <div className="container">
                    <h1>Register</h1>
                    {isOpen && <Modal setIsOpen={setIsOpenWrapper} errMessage={error}/>}
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={regValuesChangeHandler}
                        value={registerValues.email}
                    />
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        onChange={regValuesChangeHandler}
                        value={registerValues.username}
                    />
                    <label htmlFor="password">Password:</label>
                    <input type="password"
                        name="password"
                        id="password"
                        onChange={regValuesChangeHandler}
                        value={registerValues.password}
                    />
                    <label htmlFor="confirm-password">Confirm Password:</label>
                    <input type="password"
                        name="confirm-password"
                        id="confirm-password"
                        onChange={regValuesChangeHandler}
                        value={registerValues["confirm-password"]}
                    />
                    <input className="btn submit" type="submit" value="Register" />
                </div>
            </form>
        </section>
    )
}