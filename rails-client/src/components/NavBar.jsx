import {Link} from "react-router-dom";

export default function NavBar() {
    return (
        <nav>
            <Link to={"/"}>Posts List</Link>
            { "  |  " }
            <Link to={"/new"}>New Post</Link>
        </nav>
    )
}
