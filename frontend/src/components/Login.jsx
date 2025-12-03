import axios from "axios"
import { useState } from "react"


 export const Login=()=>{
    const [formData, setFormData]=useState({
        email:"",
        password:""
    })

    // const [message, setMessage]=useState("")

    const handleChange= async(e)=>{
        setFormData({...formData, [e.target.name]:e.target.value});

    }
 
     const handleSubmit= async(e)=>{
        e.preventDefault()
        try{
            const res= await axios.post("http://localhost:5000/api/login", formData)
            console.log(res.data);
            setFormData({
                email:"",
                password:""
            })
            alert("Login successfull")

        }catch(err){
            console.log("Error in Login : ", err.message);
            alert("something went wrong")
        }
        
    }

    return(
        <>
        <form action="" onSubmit={handleSubmit}>
            <h2>User Login</h2>
            <div>
                <label htmlFor="">Email:</label>
                <input type="email" placeholder="enter email" name="email" value={formData.email} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="">Password :</label>
                <input type="password" placeholder="enter password" name="password" value={formData.password} onChange={handleChange}/>
            </div>
            <div>
                <button type="submit">Login</button>
            </div>
        </form>

        </>
    )

}