import { useCallback, useEffect, useState } from "react";
import { IoColorPalette } from "react-icons/io5";
import ColorMap from "./ColorMap";
import axiosInstance from "../../api/axios";
import Notes from "../Notes/Notes";

const colors = [
   { color : 'rgb(250,175,168)' },
   { color : 'rgb(243,159,118)' },
   { color : 'rgb(226,246,211)' },
   { color : 'rgb(180,221,211)' },
   { color : 'rgb(212,228,237)' },
]
const Input = () => {

    const [showColors,setShowColors] = useState(false);
    const [selectedColor,setSelectedColor] = useState('');
    const [title,setTitle] = useState('');
    const [notes,setNotes] = useState('');
    const [dbNotes, setDbNotes] = useState([])


    const handleShowColors = ()=>{
        setShowColors(!showColors);
    }

    const handleCreateNote = useCallback(()=>{
      if(title == '' ){
        return window.alert('please give a title')
      }
      if(notes == '' ){
        return window.alert('please note something')
      }
        axiosInstance.post('/login',{title,selectedColor,notes})
        .then((res)=>{
            setDbNotes(res.data.newNotes)
        })
        .catch(error => console.log(error))
        
        setNotes('');
        setTitle('')
    },[notes, selectedColor, title]);


    useEffect(()=>{
      axiosInstance.get('/getNotes')
      .then((res)=>{
        setDbNotes(res.data.notes)
      })
      .catch((error)=>console.log(error))
    },[handleCreateNote])

  return (
    <div className="w-full flex flex-col justify-center items-center">
    <div className="w-full flex justify-center">
        <div className="shadow-lg shadow-slate-400 w-5/6 lg:w-2/6 md:4/5 xl:w-2/6 rounded-xl mt-4 p-2">
        <input type="text" value={title} className="w-full border-none  p-3 h-10 placeholder:text-slate-700"
         placeholder="Title" onChange={(e)=>setTitle(e.target.value)}/>
         <input type="text" value={notes} className="w-full border-none  p-3" placeholder="Take a note..." onChange={(e)=>setNotes(e.target.value)}/>

         <div className="flex justify-between">
            <div>
             <IoColorPalette onClick={handleShowColors} className="m-1 ml-2"/>
             <ColorMap colorProps={{showColors,colors,setSelectedColor}}/>
            </div>
            <button className="bg-teal-200 py-1 px-2 m-1 rounded-lg text-slate-700" onClick={handleCreateNote}>Create</button>
         </div>
         </div>
      </div>
         <Notes notes={dbNotes}/>
    </div>
  )
}

export default Input