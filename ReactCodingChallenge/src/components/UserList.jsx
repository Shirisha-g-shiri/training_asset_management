import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./NavBar";

const UserList = () => {
    const [user,setUser] = useState([]);
    const getApi = 'https://jsonplaceholder.typicode.com/users'
    const deleteApi = 'https://jsonplaceholder.typicode.com/users/'
    const [errMsg , setErrMsg] = useState();
    const [deleteMessage , setDeleteMessage] = useState(undefined);
    useEffect(()=>{
        const getAllUser = async() => {
            setErrMsg(undefined)
            try {
                const response = await axios.get(getApi)
                console.log(response.data);
                setUser(response.data);
            }
            catch(err){
                setErrMsg("Api Loading")
            }
        }
        getAllUser()
    },[])

    const onDelete = async (id) => {
        try {
            await axios.delete(deleteApi + id)
            let tempArry = [...user].filter(u => u.id !== id)
            setUser([...tempArry])
            setDeleteMessage("User deleted.")
        }
        catch (err) { 
            setErrMsg("User not deleted.")
            setDeleteMessage(undefined)
        }
    }
    return(
        <div>
            <Navbar/>
            <h1 className="mt-3">List Of User</h1>
            {
                errMsg !== undefined ? <div className="alert alert-danger" >
                    {errMsg}
            </div> :""
            }
            {
                deleteMessage !== undefined ? <div className="alert alert-danger" >
                    {deleteMessage}
            </div> :""
            }
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">S.No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone No</th>
                        <th scope="col">Company Name</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        user.map((u, index) => (
                            <tr key={index}>
                                <th scope="row">{(index+1)}</th>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>{u.phone}</td>
                                <td>{u.company.name}</td>
                                <td> <button className="btn btn-link p-0 text-decoration-none"
                                    onClick={() => onDelete(u.id)}>
                                    <i className="bi bi-trash"></i>
                                </button>
                                </td>
                            </tr>
                        ))
                    }


                </tbody>
            </table>
        </div>
    )
}

export default UserList

