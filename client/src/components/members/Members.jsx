import { useContext } from "react"
import { membersContext } from "../../contexts/members"

import MemberCard from "../member-card/memberCard";


export default function Members() {

    const { members, setMembersWrapper } = useContext(membersContext);

    return (
        <>
            <h1>Users:</h1>

            <ul>
                {members.map(x => <MemberCard key={x._id} member={x} />)}
            </ul>
        </>
    )
}