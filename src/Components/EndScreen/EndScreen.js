
import React, { useState,useEffect } from 'react';
import classes from './EndScreen.module.css';
const EndScreen = ({answersMarked,setActiveScreen,setQuestionBank,setAnswersMarked,setActiveQuestionID})=>{
    const[totalScore,setTotalScore] = useState("");
    useEffect(() => {
        let correctAnswers = answersMarked.filter(eachAnswerObj=>eachAnswerObj.answerMarked === eachAnswerObj.correct_answer);
        setTotalScore(correctAnswers?.length ?? 0);

        return ()=>{ //To clear required values on unmounting.
            
            setAnswersMarked([]);//empties the users respponses
            setActiveQuestionID(0);//making the first question in the array to be displayed if question screen is accessed.
        }
        
    }, []);
    const handleStartOver=()=>{// If user starts over, it should clear the question bank and the app should render the intro screen again
        setQuestionBank([]);
        setActiveScreen(1);
        
    }
    const handleStartSame = ()=>{// lets user to attempt the same quiz again, by redirecting him back to the questionscreen
        setActiveScreen(2);
    }
    return(
        <div className={classes.screenContainer}>
            <div className={classes.screenInnerContainer}>
                <div className={classes.endScreenHeader}>
                    <h2>
                        Result
                    </h2>
                </div>
                <div className={classes.scoreSection}>
                    {`Your Score is: ${totalScore} out of ${answersMarked.length}`}
                </div>
                <div className={classes.actionBtns}>
                    <button onClick={handleStartOver}>Start Over</button>
                    <button onClick={handleStartSame}>Attempt Again</button>
                </div>
            </div>
        </div>
    )
}
export default EndScreen;