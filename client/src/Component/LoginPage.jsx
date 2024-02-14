import { Link, useNavigate } from "react-router-dom"
import { useContext,useState } from "react"
import axios from "axios"
import { UserContext } from "./UserContext"
function LoginPage(){
    const navigate=useNavigate()
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const[redirect,setRedirect]=useState(false)
    const {setUser}= useContext(UserContext)
     async function Login(ev){
        ev.preventDefault()
        // await axios.post('login',{email,password})
         try{
            const {data} =await axios.post('/login',{email,password})
            setUser(data)
            alert('login succesful')
            navigate('/')
            // setRedirect(true)
         }catch(e){
            alert("login failed ")
         }
         if(redirect){
            console.log("aa")
            // return <useNavigate to="/" replace={true} />
           
         }
    }
    return(
        <div className="mt-4 grow  flex items-center justify-around">
            <div className="mb-64">
            <h1 className="text-4xl text-center mb-4"> Login </h1>
            <form className="max-w-md mx-auto " onSubmit={Login}>
                <input  type="email" placeholder=" enter email" value={email} 
                onChange={ev=>setEmail(ev.target.value)}/>
                <input type="password" placeholder=" enter password" value={password} 
                onChange={ev=>setPassword(ev.target.value)}/>
                <button className="primary">Login</button>
                <div className="text-center py-2 text-gray-500 "> Don't have account ?? <Link className=" underline text-black-500" to={'/register'} >Register</Link></div>
            </form>
            </div>
        </div>
    )
}
export default LoginPage


