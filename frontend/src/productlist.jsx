import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './app.css'
const ProductList = ()=>{
    const [products, setProducts] = useState([])
    useEffect(()=>{
        getProducts()
    },[])

    const getProducts = async () => {
        let result = await fetch('http://localhost:8010/getproducts', {
            headers : {
               "Authorization" : localStorage.getItem("jwt") 
            }
        });
        result = await result.json();
        setProducts(result)
    }
    console.log(products);

    const deleteProduct = async (id)=>{
        let result = await fetch(`http://localhost:8010/product/${id}`, {
            method : "Delete",
            headers : {
                'Authorization' : localStorage.getItem("jwt")
            }
        });
        result = await result.json()
        if(result){
            // alert('record is delete')
            getProducts()
        }
    }
    return(
        <div className="product-lists">
            <h1>Products list</h1>
            <Link to="/addproducts"><button className="add-product-btn">Add Product</button></Link>
            <ul>
                <li>S.no</li>
                <li>name</li>
                <li>price</li>
                <li>Category</li>
                <li>Operation</li>
            </ul>
            {
              products.length > 0 &&  products.map((item, index)=>
                
                        <ul>
                            <li>{index + 1}</li>
                            <li>{item.name}</li>
                            <li>{item.price}</li>
                            <li>{item.category}</li>
                            <li><button onClick={()=>deleteProduct(item._id)}>Delete</button> <Link to={"/update/" + item._id}>Update</Link></li>
                        </ul> 
                    
                )
            }
        </div>
    )
}

export default ProductList;