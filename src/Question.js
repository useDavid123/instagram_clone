import React, { useState , useEffect } from 'react';
import {  AiOutlineMinus,  AiOutlinePlus } from 'react-icons/ai';
const Question = ({question , index}, key) => {
  const {title,info,id} = question
  const [showInfo , setShowInfo] = useState(false)

const toggle = (key) =>{
 
  
// if(showInfo === key){
 
//     return setShowInfo(null)
// }
if(id !== key)  {
  setShowInfo(false)
  // setShowInfo(null)
 
 
}

  setShowInfo(!showInfo)

}


  // console.log(index)
  return <article className="question" >
    <header>
  <h4>{title}</h4>
  <button className="btn" onClick={()=> toggle(index) } key={index}>
    {
     
      showInfo ? <AiOutlineMinus /> : <AiOutlinePlus />
    }
    </button>
  </header>
  {
    showInfo && (<p>{info}</p>) 
    
  }
  
  </article>;
};

export default Question;
