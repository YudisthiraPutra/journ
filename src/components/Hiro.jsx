import React, {useState } from "react";
import Hiroimg from "../assets/Hiro.png";
import WriteJournal from "./WriteJournal"
import ReadArchive from "./ReadArchive"
import Dialogue from "./Dialogue";

function Hiro(){
    const texts = ['Welcome to', 'My name is', 'What would you like', 'Thank You and'];
    const highlight = ['Journ.', 'Hiro.', 'to do?', 'Goodybye.']
    const [runningText, setRunning] = useState(texts[0]);
    const [highlighted, setHighlighted] = useState(highlight[0]);
    const [number, setNumber] = useState(1)
    const [anitext, setAniText] = useState("boxes in")
    const [isHidden, setHidden] = useState(false);
    const [selected, setSelected] = useState('');
    const [showPath, setShowPath] = useState(false)
    const [mood, setMood] = useState('')

    function ClickHandle(){
        if(showPath===false){
            setTimeout(()=>{
                if(number<4){
                    setNumber((prevValue)=> prevValue+1);
                }
                setAniText("boxes in");
                setRunning(texts[number])
                setHighlighted(highlight[number])
                if(number===2){
                    setHidden(true)
                }
                else{
                    setHidden(false)
                }
            }, 350)
            setAniText("boxes out");
        }
    }

    function SetDirection(event){
        setTimeout(()=>{
            if(event.target.value === "read"){
                setSelected("read");
                setShowPath(true)
                console.log(selected)
            }
            else{
                setSelected("write")
                setHidden(true)
            }
        },350);
    };


    function handlemood(data){
        setShowPath(true);
        setMood(data);
        setTimeout(()=>{setNumber((prevValue)=> prevValue+1)},350);

    }

    function handleDone(data){
        setAniText("boxes out")
        setTimeout(()=>{
            setShowPath(data)
            setNumber((prevValue)=>prevValue+1)
            setAniText("boxes in")
        },350)
    }

    return (<div id="hiro" onClick={ClickHandle}>
        <div className="base">

            <div className="main">
                <img src={Hiroimg} alt="Hiro's" />
            </div>

            <div className="main dialogue">
                <div className={anitext}>
                    {selected==='' &&(
                        <div>
                            <p className="textboxes">{runningText} <span className="marked">{highlighted}</span></p>
                            {isHidden &&(
                                <div className="spot">
                                    <button value="read" className="option" onClick={SetDirection}>Read Archive</button>
                                    <button value="write" className="option" onClick={SetDirection}>Write Journal</button>
                                </div>)
                            }
                        </div>
                    )}
                    {selected !== '' && (<Dialogue
                                        num={number}
                                        direction={selected}
                                        getMood={handlemood}/>)}
                 </div>
            </div>
        </div>
        {showPath && selected==='write' && (<WriteJournal 
                            currentmood={mood}
                            handleSubmit={handleDone}/>)}
        {showPath && selected==='read' &&(<ReadArchive
                            handleSubmit={handleDone}/>)}

    </div>)
}

export default Hiro;