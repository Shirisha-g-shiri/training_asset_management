import { useState } from "react"

const CreateProduct = ()=>{

    const [name,setName] = useState() 
    const [price,setPrice] = useState() 
    const [category,setCategory] = useState() 
    const [sCount,setSCount] = useState() 

    const [isDisable, setIsDisable] = useState(true)

    const [errmsgName, seterrmsgName] = useState('Name is Mandatory');
    const [errmsgPrice, seterrmsgPrice] = useState('Price is Mandatory');
    const [errmsgCategory, seterrmsgCategory] = useState('Category is Mandatory');
    const [errmsgsCount, seterrmsgsCount] = useState('Stock count is Mandatory');
    const addProduct = (e)=>{
        e.preventDefault() 
        console.log(name)
        console.log(price)
        console.log(category)
        console.log(sCount)
    }
    return(
        <div className="container">
            <div className="row">
                
            </div>
            <div className="row mt-4">
                <div className="col-sm-3"></div>
                <div className="col-md-6">
                     <form onSubmit={(e)=> addProduct(e)}> 
                    <div className="card">
                        <div className="card-header">
                            Enter Product Details
                        </div>
                        <div className="card-body">
                             <div className="mb-4">
                                <label>Product Name: </label> <span className="badge text-bg-danger">{errmsgName}</span>
                                <input type="text" className="form-control" 
                                onChange={(e)=> {
                                    e.target.value !== "" ? seterrmsgName(""): seterrmsgName("Name is Mandatory")
                                    setName(e.target.value)
                                    
                                }}
                                />
                             </div>
                             <div className="mb-4">
                                <label>Product Price: </label> <span className="badge text-bg-danger">{errmsgPrice}</span>
                                <input type="number" className="form-control" 
                                // onChange={(e)=> setPrice(e.target.value)}
                                onChange={(e)=>{
                                    e.target.value !== "" ? seterrmsgPrice(""): seterrmsgPrice("Price is Mandatory")
                                    setPrice(e.target.value)

                                } }
                                />
                             </div>
                             <div className="mb-4">
                                <label>Category Name: </label> <span className="badge text-bg-danger">{errmsgPrice}</span>
                                <select className="form-control" onChange={(e)=> {
                                    e.target.value !== "" ? seterrmsgCategory(""): seterrmsgCategory("Please select category")
                                    setCategory(e.target.value)
                                }}>
                                    <option value="">---select category----</option>
                                    <option value="mobile">Mobiles</option>
                                    <option value="laptop">Laptop</option>
                                    <option value="desktop">Desktop</option>
                                </select>
                             </div>
                             <div className="mb-4">
                                <label>Stock Count: </label> <span className="badge text-bg-danger">{errmsgsCount}</span>
                                <input type="number" className="form-control" 
                                onChange={(e)=> {
                                    e.target.value !== "" ? seterrmsgsCount(""): seterrmsgsCount("Stock count please")
                                    setSCount(e.target.value)
                                }}/>
                             </div>
                        </div>
                        <div className="card-footer">
                            <input type="submit" value="Add Product" className="btn btn-secondary"
                            //  disabled={ ((name === undefined) || (name === "") ) ? 
                            //  ((price === undefined) || (price === "") || (price === 0) ) ?
                            //  ((category === undefined) || (category === "") ) ?    
                            //  ((sCount === undefined) || (sCount === "") || (sCount === 0)) ? true 
                            //  : false
                            //  : false
                            //  : false
                            //  : false
                            // }/>
                            disabled = {!name || !price || !category || !sCount}/>
                         </div>

                    </div>
                    </form>
                </div>
                <div className="col-sm-3"></div>
            </div>
            <div className="row">
                    
            </div>
        </div>
    )
}

export default CreateProduct