import React, { useState,useEffect } from 'react';
let timer
const Timer = ({seconds,resetTimer,pauseTimer,timeElapsedFunc,timerResetSuccess})=>{
    const [counter,setCounter] = useState(seconds);
    clearTimeout(timer)
    useEffect(() => {
        if(counter>0 && !pauseTimer){
            timer = setTimeout(()=>setCounter(counter=>counter-1),1000);// Reduces the second by one.
        }
       
    });
    useEffect(()=>{
        if(counter===0){
            timeElapsedFunc() // calling the callback function passed through props when the time is elapsed.
        }
    },[counter])
    useEffect(()=>{
        if(resetTimer){
            setCounter(seconds); // resets the timer to the mentioned time in seconds prop of the component
        }
        timerResetSuccess()// toggles the reset value in the main component
    },[resetTimer])
    
    
    return(
        <span className={counter<5?'timerRedAlert':'timerNormal'}>{`Time left: ${counter?.toString().padStart(2,0)}`}</span>
    )
}
export default Timer;