import React, { useEffect,  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserDetails } from '../store/action/authAction';
import Sidebar from '../components/admin/Sidebar';


const ProfilePage = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);
    useEffect(() => {
        dispatch(getUserDetails());
    }, [dispatch]);
    console.log(user);
    
    const navigate = useNavigate();
    const username = localStorage.getItem('username')
    const goBack = () => {
        if (user?.role === "ADMIN") {
            navigate("/admin");
        } else if (user?.role === "EMPLOYEE") {
            navigate("/employee");
        }
    };
    
    return (
    <div className="container-fluid py-4">
      <div className="card">
        <div className="card-header d-flex align-items-center">
            <button
                className="btn btn-link text-dark me-2 p-0"
                onClick={() => goBack()}
            >
                <i className="bi bi-arrow-left fs-4"></i>
            </button>

            <h4 className="mb-0">My Profile</h4>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4 text-center">
              <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '120px', height: '120px' }}>
                <i className="bi bi-person text-white" style={{ fontSize: '4rem' }}></i>
              </div>
              <h5>{username}</h5>
              <span className="badge bg-secondary">{user?.role}</span>
            </div>
            <div className="col-md-8">
              <div className="mb-3">
                <label className="form-label fw-bold">Username</label>
                <input
                  type="text"
                  className="form-control"
                  value= {username}
                  disabled
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={user.name || ''}
                  disabled
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={user.email || ''}
                  disabled
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Department</label>
                <input
                  type="text"
                  className="form-control"
                  value={user.department || ''}
                  disabled
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Role</label>
                <input
                  type="text"
                  className="form-control"
                  value={user?.role}
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
