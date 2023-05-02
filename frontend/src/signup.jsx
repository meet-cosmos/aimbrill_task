import { useNavigate } from "react-router-dom"
import M from "materialize-css"
import './app.css'
const { useState, useEffect } = require("react")

const Register = ()=>{
    const [firstname, setFirstName] = useState("")
    const [lastname, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [gender, setGender] = useState("")
    const [country, setCountry] = useState("")
    const navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem("user");
        if(auth){
            navigate('/')
        }
    })
    const HandleRegister = async ()=>{
        console.log(firstname, lastname ,email, password, phone, gender, country);
      let result = await fetch("http://localhost:8010/signup", {
            method : "POST",
            headers : {
                'Content-type' : 'Application/json',
                'Accpet' : 'Application/json'
            },
            body : JSON.stringify({
                firstname,
                lastname,
                email,
                password,
                phone,
                gender,
                country
            })        
        })
        result = await result.json()
        console.log(result);
        if(result.error){
            alert(result.error)
        }
        if(result.message){
            navigate('/login')
        }
    }
    return(
        <div className="register">
            <h1>Register</h1>
            <input type="text" className="inputBox" placeholder="Enter first name" onChange={(e)=>setFirstName(e.target.value)}/>
            <input type="text" className="inputBox" placeholder="Enter last name" onChange={(e)=>setLastName(e.target.value)}/>
            <input type="email" className="inputBox" placeholder="Enter Email" onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" className="inputBox" placeholder="Enter Password" onChange={(e)=>setPassword(e.target.value)}/>
            <input type="phone" className="inputBox" placeholder="Enter mobile no" onChange={(e)=>setPhone(e.target.value)}/>
            <input type="radio"  name="gender" value="male" onChange={(e)=>setGender(e.target.value)}/>Male
            <input type="radio"  name="gender" value="female" onChange={(e)=>setGender(e.target.value)}/>Female
            <input type="radio" name="gender" value="other" onChange={(e)=>setGender(e.target.value)}/>Other
            <select name="country" id="" value={country} className="inputBox" onChange={(e)=>setCountry(e.target.value)}>
                <option value="Select Country">Select Country</option>
                <option value="India">India</option>
                <option value="Usa">Usa</option>
                <option value="Uk">Uk</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="Japan">Japan</option>
                <option value="Singapore">Singapore</option>
                <option value="Uae">Uae</option>
            </select>
            <button onClick={HandleRegister} type="submit" className="appButton">Sign Up</button>
        </div>
    )
}

export default Register;