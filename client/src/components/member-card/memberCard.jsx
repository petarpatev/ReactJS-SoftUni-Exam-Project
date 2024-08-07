export default function MemberCard({ member }) {
    return (
        <div className="member-card">
            <img className="member-card-image" src="public/images/user-icon.jpg" alt="profile-picture" />
            <h4 className="member-card-title" >Username: {member.username}</h4>
            <p className="member-card-email" >Email: {member.email}</p>
        </div>
    )
}