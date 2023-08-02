import React, { useState } from "react";
import listOfJournal from "../staticdata";

function ReadArchive(props){
   const [isHidden, setHidden] = useState(false);
   const [animation, setAni] = useState("writeplace in");
   const [sectionAni, setSectionAni] = useState("readarchive in");
   const [found, setFound] = useState();

   function ClickHandle(event){
      const number = Number(event.target.value);
      const founded = listOfJournal.find(item=>item.key===number);

      setTimeout(()=>{
         setAni("writeplace in")
         setFound(founded);
         setHidden(true);
      },350)
      setAni("writeplace out");

   }

   function DoneHandle(){
      setSectionAni("readarchive out");
      setTimeout(()=>{
         props.handleSubmit(false)},350)

   }

   return(<div className={sectionAni}>
      <div className="list">
         {listOfJournal.map((items,index)=><button value={items.key} className="option" onClick={ClickHandle}>{items.date}</button>)}
      </div>
      <div className="content">
         {isHidden &&(
            <div className={animation}>
                  <div className="journal">
                              <h1 className="date">{found.date}</h1>
                              <p className="mood">{found.mood}</p>
                  </div>
                     <textarea value={found.content} name="content" id="journal" placeholder="..." ></textarea>
                     <button className='option' onClick={DoneHandle}>Done?</button>
               </div>
         )}
      </div>
   </div>)
}

export default ReadArchive;