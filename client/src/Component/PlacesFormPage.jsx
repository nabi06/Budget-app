import PhotosUploader from "./PhotosUploader"
import Perks from "./Perks"
import { useEffect, useState } from "react"
import AccountNav from "./AccountNav"
import axios from "axios"
import { Navigate, useParams } from "react-router-dom"
function PlacesFormPage(){
    const{id}=useParams()
    const[title,setTitle]=useState('')
    const[add,setAdd]=useState('')
    const[photo,setPhoto]=useState([])
    const[description,setDescription]=useState('')
    const[perks,setPerks]=useState('')
    const[extraInfo,setExtraInfo]=useState('')
    const[checkIn,setCheckIn]=useState('')
    const[checkOut,setCheckOut]=useState('')
    const[maxGuests,setMaxGuests]=useState(1)
    const[redirect,setRedirect]=useState(false)
    async function addNewPlace(ev){
        ev.preventDefault()
        if(id){
            await axios.put('/places/',{
                id,
                title,add,photo,description,
                perks,extraInfo,checkIn,
                checkOut,maxGuests
            })
            setRedirect(true)
        }else{
            await axios.post('/places',{
                title,add,photo,description,
                perks,extraInfo,checkIn,
                checkOut,maxGuests
            })
            setRedirect(true)
        }
    }
    
    useEffect(()=>{
        if(!id){
            return ;
        }
        axios.get('/places/'+id).then(response=>{
            const{data}=response
            setTitle(data.title)
            setAdd(data.add)
            setPhoto(data.photo)
            setDescription(data.description)
            setPerks(data.perks)
            setExtraInfo(data.extraInfo)
            setCheckIn(data.checkIn)
            setCheckOut(data.checkOut)
            setMaxGuests(data.maxGuests)
        })
    },[id])

    if(redirect){
        return <Navigate to ={'/account/places'}/>
    }
    return (
        <>
        <div>
                <AccountNav/>
                <form onSubmit={addNewPlace}>
                    <h2 className="text-xl mt-4">Title</h2>
                    <input type="text" placeholder="title" value={title} onChange={ev=>setTitle(ev.target.value)}/>
                    <h2 text-xl mt-4>Address</h2>
                    <input type="text" placeholder="address" value={add} onChange={ev=>setAdd(ev.target.value)} />
                    <h2>Photos</h2>
                    <p className="text-gray-400 text-sm"> more=better</p>
                    <PhotosUploader onChange={setPhoto} photo={photo}/>
                    <h2 className="mt-2"> Description </h2>
                    <textarea value={description} onChange={ev=>setDescription(ev.target.value)} />
                    <h2 className="mt-2"> Perks </h2>
                    <div className=" grid  gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                        <Perks selected={perks} onChange={setPerks}/>
                    </div>
                    <h2 className="mt-2"> Extra Info </h2>
                    <textarea value={extraInfo} onChange={ev=>setExtraInfo(ev.target.value)} />
                    <h2 className="mt-2"> Check in & out times </h2>
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                        <div>
                            <h3> check-in time </h3>
                            <input type="text" placeholder="14:00"
                            value={checkIn} onChange={ev=>setCheckIn(ev.target.value)}
                            />
                        </div>
                        <div>
                            <h3> check-out time </h3>
                            <input type="text" placeholder="14:00"
                            value={checkOut} onChange={ev=>setCheckOut(ev.target.value)}
                            />
                        </div>
                        <div>
                            <h3> Max number of guests</h3>
                            <input type="text" placeholder=""
                            value={maxGuests} onChange={ev=>setMaxGuests(ev.target.value)}
                            />
                        </div>
                    </div>
                    <button className="primary">SAVE</button>
                </form>
            </div>
        </>
    )
}
export default PlacesFormPage