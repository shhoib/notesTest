/* eslint-disable react/prop-types */

const ColorMap = ({colorProps}) => {
    const {showColors,colors,setSelectedColor} = colorProps;

    const handleColorSelect = ({color})=>{
        setSelectedColor(color)
    }

    return (
    <div className="flex">
    { 
     showColors && 
      colors.map((color,i)=>{
         return(
             <div key={i} className="rounded-full h-5 w-5 m-1" style={{backgroundColor: color.color}} onClick={()=>handleColorSelect({color:color.color})}></div>
       )})
     }
   </div>
  )
}

export default ColorMap