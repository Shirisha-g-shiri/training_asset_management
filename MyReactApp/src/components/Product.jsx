import { useState } from "react"
import { products } from "../sample data/products"
function Products() {
    const [productData, setProductData] = useState(products)

    const SortByPrice = (direction)=>{
        if(direction === 'ASC')
           setProductData( [...productData].sort((p1,p2)=> p1.price - p2.price))
        if(direction === 'DESC')
           setProductData( [...productData].sort((p1,p2)=> p2.price - p1.price))
    }

    const FilterInStock = ()=>{
        setProductData([...productData].filter(p=>p.inStock === true))
    }

    const reset=()=>{
        setProductData(products)
    }
    return (
        <div>
            <h1 className="text-danger">List of Products</h1>
            <div>
                <p>
                    <button onClick={()=>SortByPrice('ASC')}>Sort by Price: ASC</button>
                    <button onClick={()=>SortByPrice('DESC')}>Sort by Price: DESC</button>
                    <button onClick={()=>FilterInStock()}>Show products in Stock</button>
                    <button onClick={()=>reset()}>Reset</button>
                </p>
            </div>
            <table  className="table">

                <tr>
                    <td  scope="col">Sr. No</td>
                    <td  scope="col">Name</td>
                    <td  scope="col">Brand</td>
                    <td  scope="col">Category</td>
                    <td  scope="col">Price</td>
                    <td  scope="col">In Stock</td>
                    <td  scope="col"> </td>
                </tr>

                <tbody>
                    {
                        productData.map((p, index) => (
                            <tr key={index}>
                                <td  scope="row">{index + 1}</td>
                                <td>{p.name}</td>
                                <td>{p.brand}</td>
                                <td>{p.category}</td>
                                <td>{p.price}</td>
                                <td>{p.inStock? "true" : "false"}</td>
                                <td> </td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
        </div>
    )
}

export default Products