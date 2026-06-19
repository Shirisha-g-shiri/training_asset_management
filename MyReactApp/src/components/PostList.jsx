import axios from "axios";
import { useEffect, useState } from "react";

const PostList =()=>{

    const [posts, setPosts] = useState([])
    const url = 'https://jsonplaceholder.typicode.com/posts'
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
            <h1>All Posts</h1>
            {
                posts.map((p,index) =>(
                    <div className="row mt-2" key={index} >
                        <div className="col-lg-12">
                            <div className="card">
                                <p>User Id: {p.userId}</p>
                                <p>{p.title}</p>
                                <p>{p.body}</p>

                            </div>    
                        </div>    
                    </div>    
                ))
            }
             
        </div>
    )
}

export default PostList;