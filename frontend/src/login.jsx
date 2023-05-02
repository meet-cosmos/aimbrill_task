import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ()=>{
    const  navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const HandleLogin = async ()=>{
        console.log(email, password);
        let result = await fetch('http://localhost:8010/signin', {
            method : "POST",
            headers : {
                'Content-type' : 'Application/json',
                'Accept' : 'Application/json'
            },
            body : JSON.stringify({
                email,
                password
            })
        })
        result = await result.json()
        console.log(result);
        if(result.message){
            localStorage.setItem("jwt", result.token)
            localStorage.setItem("user", JSON.stringify(result.user))
            navigate('/')
        }else{
            alert("please enter proper details")
        }
    }
    return(
        <div className="login">
            <h1>Login</h1>
            <input type="email" className="inputBox" placeholder="Enter Email" onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" className="inputBox" placeholder="Enter Password" onChange={(e)=>setPassword(e.target.value)}/>
            <button type="submit" className="appButton" onClick={HandleLogin}>Login</button>           
        </div>
    )
}

export default Login;