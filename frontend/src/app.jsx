import Nav from "./nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './app.css'
import Register from "./signup";
import PrivateComponent from "./privatecomponent";
import Login from "./login";
import AddProduct from "./addproduct";
import ProductList from "./productlist";
import UpdateProduct from "./updateproduct";
const App = ()=>{
    return(
        <div>
            <BrowserRouter>
            <Nav/>
            <Routes>
                <Route element={<PrivateComponent/>}>
                <Route path="/" element={<ProductList/>}></Route>
                <Route path="/addproducts" element={<AddProduct/>}></Route>
                <Route path="/update/:id" element={<UpdateProduct/>}></Route>
                </Route>
                <Route path="/signup" element={<Register/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
            </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;