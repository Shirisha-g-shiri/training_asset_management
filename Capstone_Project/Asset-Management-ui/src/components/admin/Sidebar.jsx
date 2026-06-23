import { Link } from "react-router-dom";

const Sidebar = () => {

    const role = localStorage.getItem('role')
    const isFirstTime = localStorage.getItem('isFirstTime')
    console.log(isFirstTime);
    
    if(role === "ADMIN"){
        return (
            <div className="sidebar">
                <div className="logo">
                    <h3>AssetMS</h3>
                </div>
                <ul className="menu">
                    <li className="mt-3">
                        <Link to="/admin" className="d-block text-start text-decoration-none" >
                            <i className="bi bi-house"></i>&nbsp;
                            Dashboard
                        </Link>
                    </li>
                    <li className="mt-3">
                        <Link to="/admin/all-employee" className="d-block text-start text-decoration-none">
                            <i className="bi bi-person"></i>&nbsp;
                            Employees
                        </Link>
                    </li>
                    <li className="mt-3">
                        <Link to="/admin/assetCategory" className="d-block text-start text-decoration-none">
                            <i className="bi bi-box"></i> &nbsp;
                            Assets Category
                        </Link>
                    </li>
                    <li className="mt-3">
                        <Link to="/admin/assets" className="d-block text-start text-decoration-none">
                            <i className="bi bi-box"></i> &nbsp;
                            Assets
                        </Link>
                    </li>
                    <li className="mt-3">
                        <Link to="/admin/requests" className="d-block text-start text-decoration-none">
                            <i className="bi bi-arrow-repeat"></i>&nbsp;
                            Asset Requests
                        </Link>
                    </li>
                    <li className="mt-3">
                        <Link to="/admin/service-requests" className="d-block text-start text-decoration-none">
                            <i className="bi bi-arrow-repeat"></i>&nbsp;
                             Service Requests
                        </Link>
                    </li>
                    <li className="mt-3">
                        <Link to="/admin/audit-requests" className="d-block text-start text-decoration-none">
                            <i className="bi bi-arrow-repeat"></i>&nbsp;
                             Audit Requests
                        </Link>
                    </li>
                </ul>

                
                <div className="sidebar-footer">
                    <div className="profile-circle">
                        <i className="bi bi-person"></i>
                    </div>
                    <Link to="/admin/profile" className="footer-btn">
                        <i className="bi bi-person"></i>
                        Profile
                    </Link>
                </div>

            </div>
        )
    }
    else if(role === "EMPLOYEE"){
        return (
            <div className="sidebar">
                <div className="logo">
                    <h3>AssetMS</h3>
                </div>
                <ul className="menu">
                    <li className="mt-3">
                        <Link to="/employee" className="d-block text-start text-decoration-none" >
                            <i className="bi bi-house"></i>&nbsp;
                            Dashboard
                        </Link>
                    </li>
                    <li className="mt-3">
                        <Link to="/employee/browse-asset" className="d-block text-start text-decoration-none">
                            <i className="bi bi-person"></i>&nbsp;
                            Browse Asset
                        </Link>
                    </li>
                    <li className="mt-3">
                        <Link to="/employee/my-assets" className="d-block text-start text-decoration-none">
                            <i className="bi bi-box"></i> &nbsp;
                            My Assets
                        </Link>
                    </li>
                    <li className="mt-3">
                        <Link to="/employee/my-requests" className="d-block text-start text-decoration-none">
                            <i className="bi bi-arrow-repeat"></i>&nbsp;
                            My Asset Requests
                        </Link>
                    </li>
                    <li className="mt-3">
                        <Link to="/employee/my-service-requests" className="d-block text-start text-decoration-none">
                            <i className="bi bi-arrow-repeat"></i>&nbsp;
                            My Service Requests
                        </Link>
                    </li>
                    <li className="mt-3">
                        <Link to="/employee/my-audit" className="d-block text-start text-decoration-none">
                            <i className="bi bi-arrow-repeat"></i>&nbsp;
                            My Audit Requests
                        </Link>
                    </li>
                </ul>
                <div className={`sidebar-footer ${isFirstTime === "false" ? "animate__animated animate__shakeX animate__infinite" : ""}`}>
                    <div className="profile-circle">
                        <i className="bi bi-person"></i>
                    </div>

                    <Link to="/employee/change-password" className="footer-btn">
                        <i className="bi bi-person"></i>
                        Change Password
                    </Link>
                </div>
            </div>
        )

    }
}

export default Sidebar