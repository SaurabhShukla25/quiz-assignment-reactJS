import React from 'react';
import classes from './IntroScreen.module.css';

const IntroScreen = ({handleStartButton,difficultySelected,handleDifficulty})=>{
    
    return(
        <div className={classes.screenContainer}>
            <div className={classes.screenInnerContainer}>
                <div className={classes.quizHeader}>
                    <h1>
                        Computer Science Quiz
                    </h1>
                </div>
                <div className={classes.descriptionQuiz}>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                </div>
                <div className={classes.inputSection}>
                    <div><h3>Please Select difficulty level:</h3></div>
                    <div className={classes.inputGroup}>
                        <span>
                            <input onChange={(e)=>handleDifficulty(e.target.value)} id="easy" type="radio" value="Easy" name="difficultyLevel"/><label htmlFor="easy">Easy</label>
                        </span>
                        <span>
                            <input onChange={(e)=>handleDifficulty(e.target.value)} id="med" type="radio" value="Medium" name="difficultyLevel"/><label htmlFor="med">Medium</label>
                        </span>
                        <span>
                            <input onChange={(e)=>handleDifficulty(e.target.value)} id="hard" type="radio" value="Hard" name="difficultyLevel"/><label htmlFor="hard">Hard</label>
                        </span>
                        
                    </div>
                    <div onClick={handleStartButton} className = {classes.startButton}><button disabled={!difficultySelected} type="button">Start</button></div>
                </div>
            </div>
        </div>
    )
}
export default IntroScreen;