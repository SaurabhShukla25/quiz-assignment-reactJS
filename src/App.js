import React,{useState} from 'react';

import './App.css';
import IntroScreen  from './Components/IntroScreen/IntroScreen';
import QuestionScreen from './Components/QuestionScreen/QuestionScreen'
import axios from 'axios';
import EndScreen from './Components/EndScreen/EndScreen';


function App() {
  const [difficulty, setDifficulty] = useState(null);
  const [activeScreen,setActiveScreen] = useState(1);
  const [questionBank,setQuestionBank] = useState([]);
  const [activeQuestionID,setActiveQuestionID] = useState(0);
  const [answersMarked,setAnswersMarked] = useState([]);
  const fetchQuestions = ()=>{
    axios.get(`https://opentdb.com/api.php?amount=10&category=18&difficulty=${difficulty?.toLowerCase()}&type=multiple`).then(response=>{
      
      setQuestionBank(response.data);
      setActiveScreen(2);
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
