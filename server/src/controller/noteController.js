const Notes = require("../model/noteSchema");
const User = require("../model/userSchema");


const saveNotes = async(req,res)=>{
    const {title,selectedColor,notes} = req.body;

    const newNote = new Notes({title : title, note: notes, bg: selectedColor});
    await newNote.save();

    const newNotes = await Notes.find().lean().exec();
    console.log(newNotes);

    res.status(200).json({message:'note saved successfully',newNotes})
}

const getNotes = async(req,res)=>{
    const notes = await Notes.find().lean().exec();
    console.log(notes);
    res.status(200).json({message:'your notes',notes})
}

const deleteNotes = async(req,res)=>{
    try {
        const { id } = req.body;
        console.log(id);
    
        const deletedNote = await Notes.findByIdAndDelete(id);
        console.log('Deleted note:', deletedNote);
    
        res.status(200).json({ message: 'Note deleted successfully' });
      } catch (error) {
        console.error('Error deleting note:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

const updateNotes = async (req, res) => {
    try {
      const { updatedTitle, updatedNote, id } = req.body;
      console.log(updatedTitle, updatedNote, id);
  
      await Notes.findByIdAndUpdate(id, { title: updatedTitle, note: updatedNote });
  
      const updatedNotes = await Notes.find();
  
      res.status(200).json({ message: 'Note updated successfully', updatedNotes });
    } catch (error) {
      console.error('Error updating note:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  const signup = async(req,res)=>{
    const {email,password} = req.body;
    console.log(email,password);

    const existingUser = await User.findOne({email})

    if(!existingUser){
      const NewUser = new User({email:email,password:password})
      await NewUser.save()
      res.status(200).json({message:'signup successfull, please Login'})
    }else{
      res.status(202).json({message: "user already signedIn please Login"})
    }
  }

  const login = async(req,res)=>{
    const {email,password} = req.query;
    const existingUser = await User.findOne({email})
    
    if(existingUser){
      if(existingUser.password === password) {
        res.status(200).json({ message: 'login successfull' });
      } else {
        res.status(204).json({ message: 'Incorrect password' });
      }
    }else{
      res.status(202).json({message:'please signup'})
    }
  }
  
  

module.exports = {saveNotes,getNotes,deleteNotes,updateNotes,signup,login}