import React, { useState,useEffect } from 'react';
let timer
const Timer = ({seconds,resetTimer,pauseTimer,timeElapsedFunc,timerResetSuccess})=>{
    const [counter,setCounter] = useState(seconds);
    clearTimeout(timer)
    useEffect(() => {
        if(counter>0 && !pauseTimer){
            timer = setTimeout(()=>setCounter(counter=>counter-1),1000);
        }
       
    });
    useEffect(()=>{
        if(counter===0){
            timeElapsedFunc()
        }
    },[counter])
    useEffect(()=>{
        if(resetTimer){
            setCounter(seconds);
        }
        timerResetSuccess()
    },[resetTimer])
    
    
    return(
        <span className={counter<5?'timerRedAlert':'timerNormal'}>{`Time left: ${counter?.toString().padStart(2,0)}`}</span>
    )
}
export default Timer;