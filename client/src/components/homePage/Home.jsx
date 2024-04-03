// import { useEffect, useState } from "react"
import { useEffect } from "react";
import Input from "../input/Input"
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-hot-toast';


const Home = () => {

  const navigate = useNavigate()
  const isLoggedin = localStorage.getItem('isLoggedIn')
  console.log(isLoggedin);

  useEffect(()=>{
    if(!isLoggedin){
      toast('please login')
     navigate('/login')
    }
  },[isLoggedin, navigate])

  return (
    <div className="flex flex-col items-center">
        <Input/>
    </div>
  )
}

export default Home