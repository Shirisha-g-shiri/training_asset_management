import axios from "axios";
import { useEffect,useState } from "react"


const CreateNewPost =()=>{
    const [title, setTitle] = useState()
    const [body, setBody] = useState()

    const postApi = 'https://jsonplaceholder.typicode.com/posts';

    

    const createPost = async (e) => {
        e.preventDefault()
        let body_details = {
            'title': title,
            'body': body,
            'userId': 1
        }
        console.log(body_details)
        
        try {
            const response = await axios.post(postApi, body_details)
            console.log("New post created successfully")
            setTitle('')
            setBody('')
           
        }
        catch (err) {
            console.log(JSON.stringify(err))
        }

    }
    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="card">
                    <div className="card-header">
                        Create New Post
                    </div>
                    <div className="card-body">
                        <form onSubmit={(e) => createPost(e)}>
                            <div className="mb-4">
                                <label>Post Title: </label>
                                <input type="text" className="form-control" required  
                                    onChange={(e) => setTitle(e.target.value)} value={title}/>
                            </div>
                            <div className="mb-4">
                                <label>Post Body: </label>
                                <input type="text" className="form-control" required
                                    onChange={(e) => setBody(e.target.value)} value={body}  />
                            </div>
                            
                            <div className="mb-4">
                                <input type="submit" className="btn btn-secondary"
                                    value="Create Post" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CreateNewPost;