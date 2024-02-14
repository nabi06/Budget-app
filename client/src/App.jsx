import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import Index from './Component/Index'
import LoginPage from './Component/LoginPage'
import Layout from './Component/Layout'
import Register from './Component/Register'
import axios from 'axios'
import { UserContextProvider } from './Component/UserContext'
import { useEffect } from 'react'
import Account from './Component/Account'
import PlacesPage from './Component/PlacesPage'
import PlacesFormPage from './Component/PlacesFormPage'

function App() {
  const [count, setCount] = useState(0)
  axios.defaults.baseURL="http://localhost:4000"
  axios.defaults.withCredentials=true
  return (
    <UserContextProvider>
      <Routes>
        <Route path ='/' element={<Layout/>}>
        <Route index element={<Index/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path='/account' element={<Account/>}/>
        <Route path='/account/places' element={<PlacesPage/>}/>
        <Route path='/account/places/new' element={<PlacesFormPage/>}/>
        <Route path='/account/places/:id' element={<PlacesFormPage/>}/>
      </Route>
        

      </Routes>
    </UserContextProvider>
    
      
  )
}

export default App
