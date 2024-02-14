import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import axios from "axios"
 
import AccountNav from "./AccountNav"
export default function PlacesPage(){
    const[places,setPlaces]=useState([])
    useEffect(()=>{
        axios.get('/places').then(({data})=>{
            setPlaces(data)
        })
        
    },[])

     
    return(
        <>
        <AccountNav/>

            <div className="text-center">
                
            <Link className=" inline-flex gap-1 bg-primary text-white py-2 px-4 rounded-full" to={'/account/places/new'}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"  />
            </svg>
                Add new Places 
                </Link>
        </div>
        <div className="mt-4 ">
            {places.length>0 && places.map(place=>(
                <Link to={'/account/places/'+place._id} className=" flex coursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl ">
                    <div className="w-32  h-32 bg-gray-300 shrink-0">
                        {place.photo.length>0 && (places.map((place)=>(
                            <img src={'https://localhost:4000/uploads/'+place.photo[0]}/>
                        ))
                            
                        )}

                    </div>
                    <div>
                    <h2 className="text-xl">{place.title}</h2>
                    <p className="text-sm mt-2">{place.description}</p>
                    </div>
                </Link>
            ))}
        </div>
        </>
    )
}