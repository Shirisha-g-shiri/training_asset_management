import axios from "axios";
import { useEffect } from "react"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { add } from "../../store/action/employeeAction";
import { useNavigate } from "react-router-dom";
const EmployeeOnboard = () => {

    const [name, setName] = useState()
    const [username, setUsername] = useState()
    const [password, setPassword] = useState("123456")
    const [email, setEmail] = useState()
    const [mobile, setMobile] = useState()
    const [address, setAddress] = useState()
    const [gender, setGender] = useState()
    const [bloodGroup, setBloodGroup] = useState()
    const [department, setDepartment] = useState()
    const [dob, setDOB] = useState()
    const [doj, setDOJ] = useState()
    const dispatch = useDispatch()


    const [successMsg, setSuccessMsg] = useState()
    const [errMsg, setErrMsg] = useState()

    const [errMsgName, setErrMsgName] = useState()
    const [errMsgUsername, setErrMsgUsername] = useState()
    const [errMsgEmail, setErrMsgEmail] = useState()
    const [errMsgMobile, setErrMsgMobile] = useState()
    const [errMsgAddress, setErrMsgAddress] = useState()
    const [errMsgGender, setErrMsgGender] = useState()
    const [errMsgBloodGroup, setErrMsgBloodGroup] = useState()
    const [errMsgDepartment, setErrMsgDepartment] = useState()
    const [errMsgDOB, setErrMsgDOB] = useState()
    const [errMsgDOJ, setErrMsgDOJ] = useState()

    const navigate = useNavigate();

    const onboardEmployee = async (e) => {
        e.preventDefault()
        let body = {
            'name': name,
            'username': username,
            'password': password,
            'mobile_no': mobile,
            'address': address,
            'email': email,
            'gender':gender,
            'bloodGroup': bloodGroup,
            'department': department,
            'dateOfBirth': dob + "T00:00:00Z",
            'dateOfJoining': doj + "T00:00:00Z"
        }
        console.log(body)
        try {   

            await dispatch(add(body));

            setSuccessMsg("Employee Onboarded Successfully");

            setName('');
            setUsername('');
            setEmail('');
            setMobile('');
            setAddress('');
            setGender('');
            setBloodGroup('');
            setDepartment('');
            setDOB('');
            setDOJ('');

            setErrMsg(undefined);

            setTimeout(() => navigate("/admin/all-employee"), 1200)

        }
        catch(err) {

            console.log(err);

            setErrMsg(
                "Onboarding Failed " +
                (err.response?.data?.message || "")
            );
            setErrMsgName(err.response?.data?.name  || undefined)
            setErrMsgUsername(err.response?.data?.username || undefined)
            setErrMsgEmail(err.response?.data?.email || undefined)
            setErrMsgMobile(err.response?.data?.mobile || undefined)
            setErrMsgAddress(err.response?.data?.address || undefined)
            setErrMsgGender(err.response?.data?.gender  || undefined)
            setErrMsgBloodGroup(err.response?.data?.bloodGroup || undefined)
            setErrMsgDepartment(err.response?.data?.department || undefined)
            setErrMsgDOB(err.response?.data?.dob || undefined)
            setErrMsgDOJ(err.response?.data?.doj || undefined)
            setSuccessMsg(undefined);
        }
    }
    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="card">
                    <div className="card-header d-flex align-items-center gap-3">
                        <button
                            type="button"
                            className="btn btn-sm btn-secondary"
                            onClick={() => navigate('/admin/all-employee')}
                        >
                            <i className="bi bi-arrow-left"></i>
                        </button>

                        <h5 className="mb-0">
                             Add Employee
                        </h5>
                    </div>
                    <div className="card-body">
                        <form onSubmit={(e) => onboardEmployee(e)}>
                            {
                                successMsg !== undefined ?
                                    <div className="alert alert-primary mb-4"  >
                                        {successMsg}
                                    </div> :
                                    ""
                            }
                            {
                                errMsg !== undefined ?
                                    <div className="alert alert-danger mb-4"  >
                                        {errMsg}
                                    </div> : ""
                            }

                            <div className="row mb-4">
                                <div className="col-6 mb-4">
                                    <label>Employee Name: </label>
                                    {
                                        errMsgName !== undefined? 
                                        <span style={{color:'red' , fontSize : '11px'}}>
                                            {errMsgName}
                                        </span> : ""
                                    }   
                                    <input type="text" className="form-control" required  
                                        onChange={(e) => setName(e.target.value)} value={name}/>
                                </div>
                                <div className="col-6 mb-4">
                                    <label>Employee Username: </label>
                                    {
                                        errMsgUsername !== undefined? 
                                        <span style={{color:'red' , fontSize : '11px'}}>
                                            {errMsgUsername}
                                        </span> : ""
                                    }
                                    <input type="text" className="form-control" required
                                        onChange={(e) => setUsername(e.target.value)} value={username}  />
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-6 mb-4">
                                    <label>Employee Email: </label>
                                    {
                                        errMsgEmail !== undefined? 
                                        <span style={{color:'red' , fontSize : '11px'}}>
                                            {errMsgEmail}
                                        </span> : ""
                                    }   
                                    <input type="text" className="form-control" required  
                                        onChange={(e) => setEmail(e.target.value)} value={email}/>
                                </div>
                                <div className="col-6 mb-4">
                                    <label>Employee Mobile No: </label>
                                    {
                                        errMsgMobile !== undefined? 
                                        <span style={{color:'red' , fontSize : '11px'}}>
                                            {errMsgMobile}
                                        </span> : ""
                                    }
                                    <input type="text" className="form-control" required
                                        onChange={(e) => setMobile(e.target.value)} value={mobile}  />
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-6 mb-4">
                                    <label>Employee Address: </label>
                                    {
                                        errMsgAddress !== undefined? 
                                        <span style={{color:'red' , fontSize : '11px'}}>
                                            {errMsgAddress}
                                        </span> : ""
                                    }
                                    <input type="text" className="form-control" required
                                        onChange={(e) => setAddress(e.target.value)} value={address} />
                                </div>
                                <div className="col-6 mb-4">
                                    <label>Employee Gender: </label>
                                    {
                                        errMsgGender !== undefined? 
                                        <span style={{color:'red' , fontSize : '11px'}}>
                                            {errMsgGender}
                                        </span> : ""
                                    }
                                    <select className="form-control" required
                                        onChange={(e) => setGender(e.target.value)} value={gender}  >
                                            <option value="">Select Gender</option>
                                            <option value="MALE">MALE</option>
                                            <option value="FEMALE">FEMALE</option>
                                            <option value="OTHERS">OTHERS</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-6 mb-4">
                                    <label>Employee Blood Group: </label>
                                    {
                                        errMsgBloodGroup !== undefined? 
                                        <span style={{color:'red' , fontSize : '11px'}}>
                                            {errMsgBloodGroup}
                                        </span> : ""
                                    }   
                                    <input type="text" className="form-control" required  
                                        onChange={(e) => setBloodGroup(e.target.value)} value={bloodGroup}/>
                                </div>
                                <div className="col-6 mb-4">
                                    <label>Employee Department: </label>
                                    {
                                        errMsgDepartment !== undefined? 
                                        <span style={{color:'red' , fontSize : '11px'}}>
                                            {errMsgDepartment}
                                        </span> : ""
                                    }
                                    <select className="form-control" required
                                        onChange={(e) => setDepartment(e.target.value)} value={department}  >
                                            <option value="">Select Department</option>
                                            <option value="SALES">SALES</option>
                                            <option value="FINANCE">FINANCE</option>
                                            <option value="IT">IT</option>
                                            <option value="OPERATIONS">OPERATIONS</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-6 mb-4">
                                    <label>Employee DOB: </label>
                                    {
                                        errMsgDOB !== undefined? 
                                        <span style={{color:'red' , fontSize : '11px'}}>
                                            {errMsgDOB}
                                        </span> : ""
                                    }   
                                    <input type="date" className="form-control" required  
                                        onChange={(e) => setDOB(e.target.value)} value={dob}/>
                                </div>
                                <div className="col-6 mb-4">
                                    <label>Employee DOJ: </label>
                                    {
                                        errMsgDOJ !== undefined? 
                                        <span style={{color:'red' , fontSize : '11px'}}>
                                            {errMsgDOJ}
                                        </span> : ""
                                    }
                                    <input type="date" className="form-control" required
                                        onChange={(e) => setDOJ(e.target.value)} value={doj}  />
                                </div>
                            </div>
                            <div className="mb-4">
                                <input type="submit" className="btn btn-primary"
                                    value="Add Employee in System" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeOnboard