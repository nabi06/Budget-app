import axios from "axios"
import { useState } from "react"
export default function PhotosUploader({onChange,photo}){
    const[photoLink,setPhotoLink]=useState('')
    async function addPhotoByLink(ev){
        ev.preventDefault()
        console.log(photoLink)
        const{data:filename}=  await axios.post('/upload-by-link',{link:photoLink})
        onChange(prev=>{
            return[...prev,filename]
        })
        setPhotoLink('')

    }
     function uploadPhoto(ev){
        const files= ev.target.files
        const data=new FormData()
        console.log("helo")
        for(let i=0; i<files.length; i++){
            data.append('photos',files[i])
        }
        axios.post('/upload',data,{
            headers:{'Content-Type': 'multipart/from-data'}
        }).then(response=>{
            const{data:filename}=response
            onChange(prev=>{
                return[...prev,...filename]
            })
        })
    }
    return (
        <>
        <div className="flex gap-2">
                        <input type="text" placeholder={'Add using link ...jpg'} value={photoLink} onChange={ev=>setPhotoLink(ev.target.value)} />
                        <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl " >Add&nbsp;photo</button>
        </div>
        <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6 ">
                        {photo.length>0 && photo.map((link)=>(
                            <div className="h-32 flex" key={link}>
                                <img className="rounded-xl w-full obj-cover" src={'http://localhost:4000/uploads/'+link} />
                            </div>
                        ))}
                    <label className=" h-32 cursor-pointer border text-center bg-transparent rounded-2xl py-10 text-3xl text-gray-600">
                        <input type="file" multiple className="hidden" onChange={uploadPhoto} />
                        + Upload 
                        </label>
        </div>
        </>
    )
}