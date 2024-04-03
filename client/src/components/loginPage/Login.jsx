/* eslint-disable react/prop-types */

const Login = ({props}) => {
  const {text,email,setEmail, password,setPassword,onclick } =props;

  return (
    <div className="flex flex-col items-center mt-2">
      <input type="email" className="shadow-lg shadow-slate-400 rounded-md w-1/4 m-2 p-2" placeholder="email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
      <input type="password" className="shadow-lg shadow-slate-400 rounded-md w-1/4 m-2 p-2" placeholder="password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
      <button className="border-2 px-5 py-2 mt-3" onClick={onclick}>{text}</button>
    </div>
  )
}

export default Login