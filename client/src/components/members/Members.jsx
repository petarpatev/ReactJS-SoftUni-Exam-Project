import { useContext } from "react"
import { membersContext } from "../../contexts/members"


export default function Members() {

    const { members, setMembersWrapper } = useContext(membersContext);

    return (
        <>
            <h1>Users:</h1>

            <ul>
                {members.map(x => <li key={x._id}>{x.email}</li>)}
            </ul>
        </>
    )
}