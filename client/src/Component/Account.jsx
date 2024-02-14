import { useContext, useState } from "react"
import { UserContext } from "./UserContext"
import { Link, Navigate, redirect, useParams } from "react-router-dom"
import axios from "axios"
import PlacesPage from "./PlacesPage"
import AccountNav from "./AccountNav"

function Account(){
    const[redirect,setRedirect]=useState(null)
    const {ready, user,setUser}=useContext(UserContext)
    let {subpage}= useParams()
    if(subpage==undefined){
        subpage='profile'
    }
    if (!ready){
        return <div>loading...</div>
    }
    if(ready && !user && !redirect){
        return <Navigate to={'/login'}/>
    }
    //  const {bookings,places}= useParams()
    
   async function logout(){
        await axios.post('/logout')
        setRedirect('/')
        setUser(null)
    }
    
     if(redirect){
        console.log("re");
        return <Navigate to ={redirect}/>
     }
    return(
        <>
        <div>
            <AccountNav/>
            {subpage=='profile' &&(
               <div className="text-center">
                Logged in as name: {user.name} , email : {user.email}<br/>
                <button className="bg-primary px-3 py-1 rounded-full mt-2" onClick={logout}>Logout</button>
               </div>
            )}
            {subpage=='places' &&(
                <PlacesPage />
            )}
        </div>
        </>
    )
}
export default Account