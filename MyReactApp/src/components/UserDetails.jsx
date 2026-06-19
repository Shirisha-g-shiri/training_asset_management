import axios from "axios";
import { useEffect, useState } from "react";

const UserDetails =()=>{

    const [posts, setPosts] = useState([])
    const url = 'https://jsonplaceholder.typicode.com/users'
    const [errMsg, setErrMsg] = useState(); 

    useEffect(()=>{
         const getAllPosts=async ()=>{
              try{
                   const response = await axios.get(url); 
                   console.log(response)
                   setPosts(response.data)
              }
              catch(err){
                setErrMsg("Problem loading API data " + err)
              }
         }
         getAllPosts()
    }, []); // [] is to ensure that it gets called only once 
    return (
        <div className="container">
            <h1>All Users</h1>
            {
                posts.map((p,index) =>(
                    <div className="row mt-2" key={index} >
                        <div className="col-lg-12">
                            <div className="card">
                                <p>User Id: {p.id}</p>
                                <p>{p.name}</p>
                                <p>{p.email}</p>
                                <p>{p.address?.city}</p>

                            </div>    
                        </div>    
                    </div>    
                ))
            }
             
        </div>
    )
}

export default UserDetails;