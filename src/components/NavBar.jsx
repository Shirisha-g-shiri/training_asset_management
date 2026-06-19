import { Link } from "react-router-dom"

const Navbar = () => {

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">

                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/user" className="nav-link active" >User List</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/add-user" className="nav-link active">Add User</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/list" className="nav-link active">Evalution Task</Link>
                            </li>
                        </ul>
                        
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar