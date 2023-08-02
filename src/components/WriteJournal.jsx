import React, { useState } from "react";


function WriteJournal(props){
    const current = new Date();
    const dateWritten = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    const [journal,setJournal] = useState({
        date:dateWritten,
        mood:props.currentmood,
        content:''
    });
    const [animation,setAni] = useState('writejournal in')

    function HandleChange(event){
        const { name, value } = event.target;

        setJournal(prevNote => {
          return {
            ...prevNote,
            [name]: value
          };
        });
    }

    function ClickHandle(){
        setAni('writejournal out')
        setTimeout(()=>{
            props.handleSubmit(false);
        },350)
    }
    return (
        <div className={animation}>
            <div className="writeplace">
                <div className="journal">
                    <h1 className="date">{dateWritten}</h1>
                    <p className="mood">{props.currentmood}</p>
                </div>
                <textarea value={journal.content} name="content" id="journal" onChange={HandleChange} placeholder="..." ></textarea>
                <button className='option'onClick={ClickHandle}>Done?</button>
            </div>
        </div>
    )
}

export default WriteJournal;