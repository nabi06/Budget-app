const express=require('express')
const cors=require('cors')
const { default: mongoose } = require('mongoose')
const User=require('./Models/user.js')
const Place=require('./Models/Place.js')
const cookieParser= require('cookie-parser')
const bcrypt=require('bcryptjs')
const imageDownloader=require('image-downloader')
const multer=require('multer')
const fs = require('fs')
require('dotenv').config()
const app=express()
const secret=bcrypt.genSaltSync(10)
const jwt=require('jsonwebtoken')
const jwtsec='aqew12413as'
app.use(express.json())
app.use(cookieParser())
app.use('/uploads', express.static(__dirname+'/uploads'))
app.use(cors({
    credentials:true,
    origin:'http://localhost:5173'
}))

mongoose.connect(process.env.MONGO_URL)
app.get('/test',(req,res)=>{
    res.json('test ok')
}) 
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })
  
  
  
  
  
  
app.post('/register',  async (req,res)=>{
    const {name,email,password}=req.body
    try{
        const userDoc =await User.create({
            name,
            email,
            password:bcrypt.hashSync(password,secret)
        })
        res.json(userDoc)
    }catch(e){
        res.status(422).json(e)
    }
    // res.json({
    //     name,
    //     email,
    //     password
    // })
    
})
app.post('/login',async (req,res)=>{
    const {email,password}=req.body
    const userDoc = await User.findOne({email})
        if(userDoc){
            const passok=bcrypt.compareSync(password,userDoc.password)
            if(passok){
                jwt.sign({email:userDoc.email,id:userDoc._id},jwtsec,{},(err,token)=>{
                    if(err) throw err
                    res.cookie('token',token).json(userDoc)
                })
                
            }else{
                res.status(422).json('wrong password')
            }
        }else{
            res.json('not found')
        }
    })
app.get('/profile',(req,res)=>{
    const {token}=req.cookies
    if(token){
        jwt.verify(token,jwtsec,{},async(err,userData)=>{
            if(err) throw err
            const {name,email,id} = await User.findById(userData.id)
            res.json({name,email,id})
        })
    }else{
        res.json(null)
    }
    
})
app.post('/logout',(req,res)=>{
    res.cookie('token','').json(true)
})
console.log({__dirname})
app.post('/upload-by-link', async (req,res)=>{
    const {link}=req.body
    console.log(link)
    const newName='photo'+ Date.now() + '.jpg'
     await imageDownloader.image({
        url:link,
        dest: __dirname + '/uploads/' +newName
    })
    // console.log(url)
    res.json(newName)
})
const photosMiddleware =multer({dest:'uploads/'})
app.post('/upload',photosMiddleware.array('photos',100),(req,res)=>{
    const uploadedFiles=[]
    for(let i=0;i<req.files.length;i++){
        const {path,originalname}=req.files[i]
        const parts=originalname.split('.')
        const ext=parts[parts.length-1]
        const newPath=path + '.' + ext
        fs.renameSync(path,newPath)
        uploadedFiles.push(newPath.replace('uploads/',''))
    }
    res.json(uploadedFiles)
})
app.post('/places',(req,res)=>{
    const{token}=req.cookies
    const{
        title,add,photo,description,perks,extraInfo,checkIn,checkOut,maxGuests}=req.body
    jwt.verify(token,jwtsec,{},async(err,userData)=>{
        if(err) throw err;
        console.log("user",userData)
        const placeDoc = await Place.create({
            owner:userData.id,
            title,add,photo,description,perks,extraInfo,checkIn,checkOut,maxGuests,
        })
        res.json(placeDoc)
    })
   
})

app.get('/places',(req,res)=>{
    const {token}=req.cookies
    jwt.verify(token, jwtsec,{},async(err,userData)=>{
       const {id}=userData
       const data=await Place.find({owner:id})
       return res.json(data)
    })
    
})

app.get('/places/:id',async (req,res)=>{
   const{id}=req.params
   res.json(await Place.findById(id))
})

app.put('/places',async(req,res)=>{
    const{token}=req.cookies
    const{
       id, title,add,photo,description,perks,extraInfo,checkIn,checkOut,maxGuests}=req.body
        jwt.verify(token,jwtsec,{},async(err,userData)=>{
            const placeDoc=await Place.findById(id)
            if(userData.id===placeDoc.owner.toString()){
                placeDoc.set({
                    title,add,photo,description,perks,extraInfo,checkIn,checkOut,maxGuests,
                })
                await placeDoc.save()
                res.json('ok')
            }
        })
})
//VrWogFI7iU1MirZW
app.listen(4000);


//VAIxe6qPo8tY6wQf
