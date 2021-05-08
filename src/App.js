import React,{useState} from 'react';

import './App.css';
import IntroScreen  from './Components/IntroScreen/IntroScreen';
import QuestionScreen from './Components/QuestionScreen/QuestionScreen'
import axios from 'axios';
import EndScreen from './Components/EndScreen/EndScreen';


function App() {
  const [difficulty, setDifficulty] = useState(null);// Stores difficulty level selected by user.
  const [activeScreen,setActiveScreen] = useState(1);// Screen which should be displayed. i.e. Intro, Question Screen or Rsult screen
  const [questionBank,setQuestionBank] = useState([]);
  const [activeQuestionID,setActiveQuestionID] = useState(0);// Question which is being displyed on question screen
  const [answersMarked,setAnswersMarked] = useState([]);// Stores the users answers.
  const fetchQuestions = ()=>{
    axios.get(`https://opentdb.com/api.php?amount=10&category=18&difficulty=${difficulty?.toLowerCase()}&type=multiple`).then(response=>{
      
      setQuestionBank(response.data);//Sets the question recieved from API
      setActiveScreen(2); // taes the the user to questionScreen component, where usert attempts the quiz.
    }).catch(error=>{
      alert("Some Error occured. Please try again after some time.")
      console.log(error)
    })
  }
  return (
    <div className="AppCon">
      {activeScreen===1 && (<IntroScreen 
        difficultySelected={difficulty}
        handleStartButton={fetchQuestions}
        handleDifficulty={setDifficulty}
        />
        
      )}
      {activeScreen===2 && questionBank.results?.length && <QuestionScreen setActiveScreen={setActiveScreen}  answersMarked={answersMarked} setAnswer={setAnswersMarked} setActiveQuestion={setActiveQuestionID} activeQuestionID={activeQuestionID} questionData={questionBank.results}/>}
      {activeScreen===3 && <EndScreen setQuestionBank={setQuestionBank} setAnswersMarked={setAnswersMarked}  setActiveQuestionID={setActiveQuestionID} setActiveScreen={setActiveScreen} answersMarked={answersMarked}/>}
    </div>
  )
}

export default App;
