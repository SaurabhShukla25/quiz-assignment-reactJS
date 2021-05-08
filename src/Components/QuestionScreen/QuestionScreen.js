import React,{useEffect, useState} from 'react';
import classes from './QuestionScreen.module.css';
import Timer from '../Timer/Timer';
const QuestionScreen = ({setActiveScreen,setActiveQuestion,questionData,activeQuestionID,setAnswer,answersMarked})=>{
    const [filteredQuestion,setFilteredQuestion] = useState({});
    const [disableInput,setDisableInput] = useState(false);
    const [timerProps,setTimerProps] = useState({pauseTimer:false,resetTimer:true})
    useEffect(() => {

        resetForm(); // enabling the input field for the new question   after the previous question is answered.
        filterQuestion(activeQuestionID);// to get the next question from question bank array.

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
        // if questions are still present in the array
        if(activeQuestionID<questionData.length-1){
            setActiveQuestion(prevState=>prevState+1)// sets next question
            setTimerProps({resetTimer:true,pauseTimer:false})// resets the timer for next question

        }else{
            setActiveScreen(3) // if all questions has been displayed from thr array, takes the user to next screen, by setting the next active screen
        }
    }
    const handleAnswerInput = (e)=>{ // handles user's selected answer.
        
        setAnswer(prevState =>
            [...prevState,
                {question:filteredQuestion.question,answerMarked:e.target.value,correct_answer:filteredQuestion.correct_answer}
            ]); // adding the marked answer to answers array along with other metadata.
            setDisableInput(true); // Freeze the input field if answer is marked.
            setTimerProps(prevState=>({...prevState,pauseTimer:true}))// Pauses the timer.
            setTimeout(setNextView,3000);//Wait for user to read the answer marked and if the answer was correct or not. 
    }
    const setClass = (choice)=>{// This function sets class dynamically. if selected answer is correct sets with "isCorrect" class, if incorrect sets with "incorrect" class, along with a default class "eachOption"
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
        setDisableInput(true)// freeze the input, since time is elapsed
        setAnswer(prevState =>
            [...prevState,
                {question:filteredQuestion.question,answerMarked:null,correct_answer:filteredQuestion.correct_answer}
            ]);// if not marked already, sets the null in answers array
        setTimeout(setNextView,3000);// wait for user to read the correct answer and then moves to next screen
    }
    const switchResetToFalse = ()=>{
        setTimerProps(prevState=>({...prevState,resetTimer:false})) //After the timer is resetted, making the resetTimer state to false again.
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