import React,{useEffect, useState} from 'react';
import classes from './QuestionScreen.module.css';
import Timer from '../Timer/Timer';
const QuestionScreen = ({setActiveScreen,setActiveQuestion,questionData,activeQuestionID,setAnswer,answersMarked})=>{
    const [filteredQuestion,setFilteredQuestion] = useState({});
    const [disableInput,setDisableInput] = useState(false);
    const [timerProps,setTimerProps] = useState({pauseTimer:false,resetTimer:true})
    useEffect(() => {

        resetForm();
        filterQuestion(activeQuestionID);

    }, [activeQuestionID]);

    const filterQuestion = (qID)=>{
        if(qID<questionData.length && qID >=0 ){
            setFilteredQuestion(questionData[qID])
        }
    }
    const resetForm = ()=>{
        setDisableInput(false);
        
    }
    const setNextView = ()=>{
        if(activeQuestionID<questionData.length-1){
            setActiveQuestion(prevState=>prevState+1)
            setTimerProps({resetTimer:true,pauseTimer:false})

        }else{
            setActiveScreen(3)
        }
    }
    const handleAnswerInput = (e)=>{
        
        setAnswer(prevState =>
            [...prevState,
                {question:filteredQuestion.question,answerMarked:e.target.value,correct_answer:filteredQuestion.correct_answer}
            ]);
            setDisableInput(true);
            setTimerProps(prevState=>({...prevState,pauseTimer:true}))
            setTimeout(setNextView,3000);
    }
    const setClass = (choice)=>{
        if(disableInput && answersMarked[activeQuestionID]){
            if(answersMarked[activeQuestionID]?.correct_answer === choice)
                return `${classes.eachOption} ${classes.isCorrect}`
            else if(answersMarked[activeQuestionID]?.answerMarked === choice)
                return `${classes.eachOption} ${classes.isInCorrect}`
            else
                return `${classes.eachOption}`
        }else
            return `${classes.eachOption}`
        
    }
    const timeElapsed = ()=>{
        setDisableInput(true)
        setAnswer(prevState =>
            [...prevState,
                {question:filteredQuestion.question,answerMarked:null,correct_answer:filteredQuestion.correct_answer}
            ]);
        setTimeout(setNextView,3000);
    }
    const switchResetToFalse = ()=>{
        setTimerProps(prevState=>({...prevState,resetTimer:false}))
    }
    return(
        <div className={classes.screenContainer}>
            {Object.keys(filteredQuestion)?.length?
           
                <div className={classes.screenInnerContainer}>
                    <div className={classes.questionContainer}>
                        <div><span>{`Question ${activeQuestionID+1}: `}</span><span>{<div dangerouslySetInnerHTML={{__html:filteredQuestion.question}} />}</span></div>
                        <div>
                            <Timer resetTimer={timerProps.resetTimer} timeElapsedFunc={timeElapsed} timerResetSuccess={switchResetToFalse} pauseTimer={timerProps.pauseTimer} seconds={10}/>
                        </div>

                    </div>
                    <div className={classes.choicesCon}>
                        {[...filteredQuestion.incorrect_answers,filteredQuestion.correct_answer].sort().map((item,index) => {
                            return(
                                <div className={setClass(item)} key={index}>
                                    <label>
                                        <input disabled={disableInput} checked={answersMarked[activeQuestionID]?.answerMarked === item || false} onChange={handleAnswerInput} name={`options${activeQuestionID}`} type="radio" value={item}/><span>{item}</span>
                                    </label>
                                </div>
                            )
                            
                        })}
                        {disableInput && answersMarked[activeQuestionID] ?<>
                            {answersMarked[activeQuestionID].correct_answer === answersMarked[activeQuestionID].answerMarked?
                                <div className={classes.successMsg}>Congratulations!! Your answer is correct.</div>
                            :
                                <div className={classes.errorMsg}>{`Oops!! The correct answer is: ${answersMarked[activeQuestionID].correct_answer}`}</div>
                                
                        }</>
                        :null}
                    </div>
                    
                </div>

            :null}
        </div>
    )
}
export default QuestionScreen;