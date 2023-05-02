import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = ()=>{
    const navigate = useNavigate()
    const [product, setProduct] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const addproducts = async ()=>{
        let add_products = await fetch('http://localhost:8010/createproduct', {
            method : "POST",
            headers : {
                "Authorization": localStorage.getItem("jwt"),
                'Content-Type' : 'application/json',
                'Accept' : 'application/json',
            },
            body : JSON.stringify({
               name : product,
                price,
                category
            })
        })
        add_products = await add_products.json()
        console.log(add_products);
        if(add_products.message){
            console.log("added");
            navigate('/')
        }
        if(add_products.error){
            alert(add_products.error)
        }
    }
    return(
       <div className="Add-products">
        <h1>Add products</h1>
        <input type="text" className="inputBox" placeholder="Enter product name" onChange={(e)=>setProduct(e.target.value)}/>
        <input type="text" className="inputBox" placeholder="Enter product price" onChange={(e)=>setPrice(e.target.value)}/>
        <select name="category" id="" className="inputBox" onChange={(e)=>setCategory(e.target.value)}>
            <option value="select category">select category</option>
            <option value="electronics">electronics</option>
            <option value="fashion">fashion</option>
            <option value="cosmetics">cosmetics</option>
            <option value="health and wellness">health and wellness</option>
            <option value="household items">household items</option>
            <option value="other">other</option>
        </select>
        <button onClick={addproducts} type="submit" className="appButton">Add Products</button>
       </div> 
    )
}

export default AddProduct;