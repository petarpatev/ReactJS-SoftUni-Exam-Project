import { Link } from "react-router-dom"
import { useContext } from "react"
import { userContext } from "../../contexts/user"

export default function Navigation() {

    const { user } = useContext(userContext);

    return (
        <header>
            <h1>
                <Link className="home" to="/">
                    Home
                </Link>
            </h1>
            <nav>
                {user ? <span style={{ marginRight: "10px", fontStyle: "Italic"}}>{user.email}</span> : <span style={{ marginRight: "10px", fontStyle: "Italic" }}>Guest</span>}
                <Link to="/members">Members</Link>
                <Link to="/catalog/articles">Articles</Link>
                {user
                    ? <div id="user">
                        <Link to="/create">Create Article</Link>
                        <Link to="/logout">Logout</Link>
                    </div>
                    : <div id="guest">
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </div>}
            </nav>
        </header>
    )
}