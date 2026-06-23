import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [showPassword, setShowPassword] = useState(false);
    const [errMsg, setErrMsg] = useState()

    const loginApi = "http://localhost:8080/api/auth/login"; 
    const userDetailsApi="http://localhost:8080/api/auth/user-details"

    const navigate = useNavigate()

    const onLogin = async (e)=>{
        e.preventDefault();
        // Prepare the header
        const config = {
            headers :{
                'Authorization' : "Basic " + window.btoa(username + ":" + password)
            } 
        }
        try{
            const response = await axios.get(loginApi , config) 
            console.log(response.data)
            let token = response.data.token 
            // Save this in localStorage along with username
            localStorage.setItem("token" , token)
            localStorage.setItem("username", username)

            // Prepare the header 
            const config_details = {
            headers :{
                'Authorization' : "Bearer " + token
                } 
            }
            // Fetch User Details
            const resp = await axios.get(userDetailsApi, config_details)
            console.log(resp.data)
            let role = resp.data.role
            let isFirstTime = resp.data.isFirstTime
            localStorage.setItem("role" , role )
            localStorage.setItem("isFirstTime" , isFirstTime )

            switch(role){
                case 'EMPLOYEE':
                    navigate('/employee')
                    break; 
                case 'ADMIN':
                    navigate('/admin')
                    break; 
                default: 
                    setErrMsg("Invalid credentials")
                    break; 
            }
        }
        catch(err){
            setErrMsg("Invalid credentials")
        }
        
    }
  return (
    <div className="container-fluid">
      <div className="row min-vh-100 align-items-center justify-content-center bg-light">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow border-0">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <h2 className="fw-bold text-primary">Asset Management System</h2>
                <p className="text-muted">Sign in to your account</p>
              </div>
              {errMsg && (
                <div className="alert alert-danger" role="alert">
                  {errMsg}
                </div>
              )}
              <form onSubmit={(e)=>onLogin(e)}>
                <div className="mb-3">
                  <label htmlFor="userId" className="form-label">
                    Username
                  </label>
                  <input type="text" className="form-control" onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username" required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <div className="input-group">
                    <input type={showPassword ? "text" : "password"}  className="form-control" onChange={(e) => setPassword(e.target.value)}  placeholder="Enter your password" required
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary w-100 py-2">Sign In
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login


