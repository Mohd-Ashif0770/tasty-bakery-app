import React from 'react'
import { useState } from 'react'
import axios from 'axios'

export const Register = () => {
    const [formData, setFormData]=useState({
        name:"",
        email:"",
        password:""
    })
    
    const handleChange=(e)=>{
        setFormData({...formData, [e.target.name] : e.target.value} );
    }

    const handleSubmit= async(e)=>{
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:5000/api/register", formData)
            console.log(response.data);
            setFormData({
                name:"",
                email:"",
                password:""
            });

        }catch(err){
            console.log("Error in Registration : ", err.message);
    
        }

    }


  return (
    <div>
        <form onSubmit={handleSubmit}>
            <h2>Registration form</h2>

            <div>
                <label htmlFor="">Name:</label>
                <input type="text" name='name' value={formData.name} onChange={handleChange} />
            </div>
             <div>
                <label htmlFor="">Email:</label>
                <input type="email" name='email' value={formData.email} onChange={handleChange} />
            </div>
             <div>
                <label htmlFor="">Password:</label>
                <input type="password" name='password' value={formData.password} onChange={handleChange} />
            </div>
            <div>
                <button type='submit'>Register</button>
            </div>

        </form>

    </div>
  )
}
