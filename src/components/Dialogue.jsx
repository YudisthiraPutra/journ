import React, {useState, useEffect} from "react";
import listOfSongs from "../staticsongs.js";

function Dialogue(props){
    const writeDial = ['How are you', 'If youre done, click','Thank you, heres a'];
    const writeHigh = ['feeling?','done.', 'gift.']
    const options = ['Good', 'Decent', 'Bad', 'Done', 'Click Me']
    const [pickedSong,setPicked] = useState('');

    function ClickHandle(event){
        if(props.num-4 ===0){
            props.getMood(event.target.value);
        }
        console.log(event.target.value)
        const chosenMood = listOfSongs.filter(item=>item.mood===event.target.value);
        const rand = Math.floor(Math.random() * chosenMood.length);
        const chosenSong = chosenMood.filter((item,index)=>index===rand);
        setPicked(chosenSong[0].url)

    }
    function handleMap(items,index){
        if(props.num-4 === 0 && props.direction==="write"){
            return index<3 && (<button key={index} value={items} className="option" onClick={ClickHandle} >{items}</button>)
        }
        else if(props.num-4===2 && props.direction==="write"){
            return index>3  && (<a href={pickedSong}><button key={index} value={items} className="option single" onClick={ClickHandle} >{items}</button></a>)
        }
        else if(props.num-3===2 && props.direction==="read"){
            return index>3  && (<a href={pickedSong}><button key={index} value={items} className="option single" onClick={ClickHandle} >{items}</button></a>)
        }

    }
    useEffect(()=>{
        if(props.direction==="read"){
            const rand = Math.floor(Math.random() * listOfSongs.length);
            const chosenSong = listOfSongs.filter((item,index)=>index===rand);
            setPicked(chosenSong[0].url)
        }
    },[])

    return(
        <div>
            {<div>
                {props.direction==="write" && ( 
                <div>
                    <p className="textboxes">{writeDial[props.num-4]} <span className="marked">{writeHigh[props.num-4]}</span></p>
                    <div className="spot">
                        {options.map(handleMap)}
                    </div>
                </div>)}
                
                {props.direction==="read" && ( 
                <div>
                    <p className="textboxes">{writeDial[props.num-3]} <span className="marked">{writeHigh[props.num-3]}</span></p>
                    <div className="spot">
                        {options.map(handleMap)}
                    </div>
                </div>)}
            </div>}
            
        </div>
    )
}

export default Dialogue;

