import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { userContext } from "../../contexts/user";

import * as authService from '../../api/auth'
import { isValid } from "../../utils/validation";


export default function Register() {

    const navigate = useNavigate();
    const { setUserWrapper } = useContext(userContext);

    const [registerValues, setRegisterValues] = useState({
        email: '',
        password: '',
        ['confirm-password']: ''
    })

    const regValuesChangeHandler = (e) => {
        e.preventDefault();
        setRegisterValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    const registerSubmitHandler = async (e) => {
        e.preventDefault();
        if (isValid(registerValues)) {
            const user = await authService.register(registerValues.email, registerValues.password);
            setUserWrapper(user);
            e.target.reset();
            navigate('/');
        } else {
            alert('All fields are required')
        }
    }

    return (
        <section id="register-page" className="content auth">
            <form onSubmit={registerSubmitHandler} id="register">
                <div className="container">
                    <h1>Register</h1>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={regValuesChangeHandler}
                        value={registerValues.email}
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
                        value={registerValues.confirmPassword}
                    />
                    <input className="btn submit" type="submit" value="Register" />
                </div>
            </form>
        </section>
    )
}