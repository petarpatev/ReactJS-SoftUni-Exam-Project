import { Link } from "react-router-dom"
import { useContext } from "react"
import { userContext } from "../../contexts/user"

export default function MemberCard({ member }) {

    const { user } = useContext(userContext);

    return (
        <>
            <div className="member-card">
                {user &&
                    <Link to={`/members/${member._id}`} className="member-card-btn">
                        Details
                    </Link>
                }
                <img className="member-card-image" src="public/images/user-icon.jpg" alt="profile-picture" />
                <h4 className="member-card-title" >Username: {member.username}</h4>
                <p className="member-card-email" >Email: {member.email}</p>
            </div>
        </>
    )
}