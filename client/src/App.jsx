import Home from "./components/homePage/Home"
import {Routes,Route} from 'react-router-dom'
import Login from "./components/loginPage/Login"
import { useState } from "react"
import axiosInstance from "./api/axios"
import { Toaster } from 'react-hot-toast';
import toast from "react-hot-toast";
import {useNavigate} from 'react-router-dom'

function App() {

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('');

  const navigate = useNavigate()

  const handleLogin = () => {
    console.log(email, password);
    axiosInstance.get('/login', {
      params: { email: email, password: password } })
      .then((res) => {
        console.log(res);
       if(res.status ==200){
        toast.success(res.data.message);
        setEmail('') 
        setPassword('')
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/')
       }
       if(res.status == 204){
        toast.error('Incorrect Password')
       }
       if(res.status ==202){
        toast(res.data.message)
        setEmail('') 
        setPassword('')
        navigate('signup')
       }
      })
      .catch(err => console.log(err));
  };
  

  const handleSignUp = ()=>{
    axiosInstance.post('/signup',{email,password})
    .then((res)=>{
      if(res.status == 200){
        setEmail('') 
        setPassword('')
        toast.success(res.data.message)
        navigate('/login')
      }
      if(res.status == 202){
        toast(res.data.message)
        setEmail('') 
        setPassword('')
         navigate('/login') 
      }
    })
    .catch(err=>console.log(err))
  }

  const loginProps = {
    text : 'Login',
    email,setEmail, password,setPassword,
    onclick: handleLogin,
  }
  const signUpProps = {
    text : 'signUp',
    email,setEmail, password,setPassword,
    onclick: handleSignUp,
  }
  return (
    <>
     <Toaster toastOptions={{style:{ background:'rgb(51 65 85', color:'#fff'}}}/>
     <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login props={loginProps}/>} />
      <Route path="/signup" element={<Login props={signUpProps}/>} />
     </Routes>
    </>
  )
}

export default App
