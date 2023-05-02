import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const UpdateProduct = ()=>{
    const navigate = useNavigate()
    const [product, setProduct] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const params = useParams();

    useEffect(()=>{
        getProductDetails();
    },[])

    const getProductDetails = async ()=>{
        let result = await fetch(`http://localhost:8010/product/${params.id}`, {
            headers : {
                'Authorization' : localStorage.getItem("jwt")
            }
        })
        result = await result.json()
        console.log(result);
        setProduct(result.name)
        setPrice(result.price)
        setCategory(result.category)
    }
    const updateproducts = async ()=>{
        let result = await fetch(`http://localhost:8010/product/${params.id}`, {
            method : "PUT",
            headers : {
                'Authorization' : localStorage.getItem("jwt"),
                'Content-Type' : 'application/json',
                'Accept' : 'application/json'
            },
            body : JSON.stringify({
                name : product,
                price,
                category
            })
        })
        result = await result.json()
        console.log(result);
        if(result.error){
           return alert(result.error)
        }
        // if(res)
        navigate('/')
    }
    return(
       <div className="Add-products">
        <h1>Update product</h1>
        <input type="text" className="inputBox" placeholder="Enter product name" onChange={(e)=>setProduct(e.target.value)} value={product}/>
        <input type="text" className="inputBox" placeholder="Enter product price" onChange={(e)=>setPrice(e.target.value)} value={price}/>
        <select name="category" id="" className="inputBox" onChange={(e)=>setCategory(e.target.value)} value={category}>
            <option value="select category">select category</option>
            <option value="electronics">electronics</option>
            <option value="fashion">fashion</option>
            <option value="cosmetics">cosmetics</option>
            <option value="health and wellness">health and wellness</option>
            <option value="household items">household items</option>
            <option value="other">other</option>
        </select>
        <button onClick={updateproducts} type="submit" className="appButton">Update Product</button>
       </div> 
    )
}

export default UpdateProduct;