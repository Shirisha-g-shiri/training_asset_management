import axios from "axios";
import { useState } from "react";


const ChangePassword = () => {

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [successMsg, setSuccessMsg] = useState()
    const [errMsg, setErrMsg] = useState()

    const api = 'http://localhost:8080/api/auth/employee/change-password'

    const config_details = {
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('token')
        }
    }

    const changePassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setErrMsg("New Password and Confirm Password do not match")
            return;
        }

        let body = {
            'oldPassword' : oldPassword,
            'newPassword' : newPassword,
            'confirmPassword' : confirmPassword
        }

        console.log(body)

        try {
            await axios.put(api, body, config_details)
            setSuccessMsg("Password changed successfully")
            setNewPassword("")
            setOldPassword("")
            setConfirmPassword("")
            setErrMsg(undefined)
            localStorage.setItem("isFirstTime" , true )
        }
        catch(err){
            setErrMsg("Password not changed")
            setSuccessMsg(undefined)
        }
        
    }

    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="card">

                    <div className="card-header">
                        Change Password
                    </div>

                    <div className="card-body">

                        <form onSubmit={(e) => changePassword(e)}>

                            {
                                successMsg &&
                                <div className="alert alert-success mb-4">
                                    {successMsg}
                                </div>
                            }

                            {
                                errMsg &&
                                <div className="alert alert-danger mb-4">
                                    {errMsg}
                                </div>
                            }

                            <div className="row mb-4">
                                <div className="col-6">
                                    <label>Old Password:</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        required
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="row mb-4">
                                <div className="col-6">
                                    <label>New Password:</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        required
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="row mb-4">
                                <div className="col-6">
                                    <label>Confirm New Password:</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <input
                                    type="submit"
                                    className="btn btn-primary"
                                    value="Change Password"
                                />
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;