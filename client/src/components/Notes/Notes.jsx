/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { MdEdit, MdOutlineDelete } from 'react-icons/md';
import axiosInstance from '../../api/axios';
import { useCallback } from 'react';
import {toast} from 'react-hot-toast';


const Notes = ({ notes }) => {
  const [notesList, setNotesList] = useState(notes);
  const [updateItemId, setUpdateItemId] = useState(null);
  const [updatedTitle,setUpdatedTitle] = useState('')
  const [updatedNote,setUpdatedNote] = useState('')

  useEffect(() => {
    setNotesList(notes);
  }, [notes]);

  const handleDeleteNotes = useCallback(({ id }) => {
      axiosInstance.delete('/deleteNote', { data: { id } })
        .then((res) => {
          console.log(res);
          const updatedNotesList = notesList.filter((note) => note._id !== id);
          toast.success('note deleted')
          setNotesList(updatedNotesList);
        })
        .catch((error) => console.log(error));
    },
    [notesList]
  );

  const handleOpenUpdateInput = (id) => {
    setUpdateItemId(id);
  };

  const handleUpdateNotes =(id)=>{
    if(updatedTitle==''){
      return toast.error('please update title')
    }
    if(updatedNote==''){
      return toast.error('please update note')
    }
    axiosInstance.patch('/updateNotes',{updatedTitle,updatedNote,id})
    .then((res)=>{
      setNotesList(res.data.updatedNotes)
      toast.success('updat successfull')
      setUpdateItemId(null);
      setUpdatedNote('');
      setUpdatedTitle('')
    })
    .catch(err=>console.log(err))
  }

  return (
    <div className="flex flex-wrap w-full justify-center gap-5 mt-12">
      {notesList.map((note, i) => {
        return (
          <div className={`xl:w-1/5 md:w-2/5 w-5/6 py-2 px-4 rounded-lg h-min ${note.bg == '' ? 'border-2' : null}`}style={{ backgroundColor: note.bg }} key={i} >
            <div className="flex justify-between">
              <h1 className="text-2xl break-all">{note.title}</h1>
              <div className="flex items-center justify-center gap-3">
               <MdEdit onClick={() => handleOpenUpdateInput(note._id)} />
                <MdOutlineDelete onClick={() => handleDeleteNotes({ id: note._id })} />
              </div>
            </div>

              {updateItemId === note._id &&
               <input type="text" className='w-full rounded-lg p-1 m-1 mt-2' placeholder='update your Title here...' 
               onChange={(e)=>setUpdatedTitle(e.target.value)} value={updatedTitle}/>
              }

            <hr className="my-3 border-slate-400" />
            {updateItemId === note._id &&
             <div className='flex flex-col justify-center'>
               <input type="text"  className='w-full rounded-lg p-1 m-1' placeholder='update your Notes here..' 
               onChange={(e)=>setUpdatedNote(e.target.value)} value={updatedNote} />
               <button className='border-2 m-1' onClick={()=>handleUpdateNotes(note._id)}>Update</button>
             </div>
            }

            <h6 className="break-all">{note.note}</h6>
          </div>
        );
      })}
    </div>
  );
};

export default Notes;
