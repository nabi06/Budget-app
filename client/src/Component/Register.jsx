import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
function Register(){
    const[name,setName]=useState('')
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
     async function register(ev){
            ev.preventDefault()
             try{
                await axios.post('http://localhost:4000/register',{
                    name,
                    email,
                    password
                })
                // setEmail('')
                // setPassword('')
                // setName('')
                alert('REgistered sucessfully')
             }catch(e){
                alert("failed")

             }
    }
    return(
        <div className="mt-4 grow  flex items-center justify-around">
            <div className="mb-64">
            <h1 className="text-4xl text-center mb-4"> Register </h1>
            <form className="max-w-md mx-auto " onSubmit={register}>
            <input  type="text" placeholder=" enter name" 
                value={name} 
                onChange={ev=>{setName(ev.target.value)}}
                />
                <input  type="email" placeholder=" enter email"
                value={email} 
                onChange={ev=>{setEmail(ev.target.value)}}
                />
                <input type="password" placeholder=" enter password"
                value={password} 
                onChange={ev=>{setPassword(ev.target.value)}}
                />
                <button className="primary">Register</button>
                <div className="text-center py-2 text-gray-500 "> Already a member <Link className=" underline text-black-500" to={'/login'} >Login</Link></div>
            </form>
            </div>
        </div>
    )
}
export default Register