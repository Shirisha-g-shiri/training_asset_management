import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import Navbar from "./NavBar";

const AddUser = () => {
    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [phoneNo,setPhoneNo] = useState();
    const [companyName,setCompanyName] = useState();
    const [errMsg , setErrMsg] = useState(undefined);
    const [successMsg , setSuccessMsg] = useState(undefined);
    const navigate = useNavigate();

    const postApi = 'https://jsonplaceholder.typicode.com/users'

    const createNewUser = async (e) => {
        e.preventDefault()
        let userBody = {
            'name' : name,
            'email' : email,
            'phone' : phoneNo,
            'companyName' : companyName
        }

        try{
            const response = await axios.post(postApi,userBody)
            console.log(userBody);
            
            console.log('User created Successfully');
            console.log(response);
            
            setName('');
            setEmail('');
            setPhoneNo('');
            setCompanyName('');
            setSuccessMsg('User Created Successfully')
            setErrMsg(undefined)
            // navigate('/user')
        }
        catch(err){
            console.log(err);
            setErrMsg('User Not Created ')
            setSuccessMsg(undefined)
            
        }
        
    }

    return(
        <div className="row">
            <Navbar/>
            <div className="col-lg-12 p-5">
                <div className="card">
                    <div className="card-header">
                        Add new user
                    </div>
                    <div className="card-body">
                        <form onSubmit={(e) => createNewUser(e)}>
                            {
                                errMsg !== undefined ? <div className="alert alert-danger" >
                                    {errMsg}
                            </div> :""
                            }
                            {
                                successMsg !== undefined ? <div className="alert alert-success" >
                                    {successMsg}
                            </div> :""
                            }
                            <div className="mb-4">
                                <label>Name: </label>
                                <input type="text" className="form-control" required  
                                    onChange={(e) => setName(e.target.value)} value={name}/>
                            </div>
                            <div className="mb-4">
                                <label>Email: </label>
                                <input type="text" className="form-control" required  
                                    onChange={(e) => setEmail(e.target.value)} value={email}/>
                            </div>
                            <div className="mb-4">
                                <label>Phone No: </label>
                                <input type="text" className="form-control" required  
                                    onChange={(e) => setPhoneNo(e.target.value)} value={phoneNo}/>
                            </div>
                            <div className="mb-4">
                                <label>Company Name: </label>
                                <input type="text" className="form-control" required  
                                    onChange={(e) => setCompanyName(e.target.value)} value={companyName}/>
                            </div>
                            <div className="mb-4">
                                <input type="submit" className="btn btn-secondary"
                                    value="Create User" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddUser