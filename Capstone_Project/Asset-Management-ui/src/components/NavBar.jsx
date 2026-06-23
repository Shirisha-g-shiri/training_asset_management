import { useNavigate } from "react-router-dom";

const Navbar = () => {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };
    const username = localStorage.getItem('username')
    const role = localStorage.getItem('role')

  return (
    <nav className="navbar-admin">


      {/* <div className="nav-right">

        <div className="nav-user">
          <i className="bi bi-person"></i>
        </div>


        <button className="logout-btn" onClick={logout}>
          Logout
        </button>

      </div> */}

      <div className="navbar-nav ms-auto">
          <div className="nav-item dropdown">
            <button
              className="nav-link dropdown-toggle d-flex align-items-center"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-2" style={{ width: '35px', height: '35px' }}>
                <i className="bi bi-person text-white"></i>
              </div>
              <span className="d-none d-md-inline">{username}</span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <span className="dropdown-item-text">
                  <div className="fw-bold">{username}</div>
                  <small className="text-muted">{role}</small>
                </span>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <button className="dropdown-item" onClick={() => navigate('/profile')}>
                  <i className="bi bi-person-gear me-2"></i> Profile
                </button>
              </li>
              <li>
                <button className="dropdown-item" onClick={() => logout()}>
                  <i className="bi bi-box-arrow-right me-2"></i> Logout
                </button>
              </li>
            </ul>
          </div>
        </div>

    </nav>
  );
};


export default Navbar;