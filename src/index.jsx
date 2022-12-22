import "./styles/styles.css";
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { ColorButton } from "./components/ColorButton.jsx";

const App = () => {
    const buttonColours = ["green", "red", "yellow", "blue"];
    const [gamePattern, setGamePattern] = useState([]);
    const [userClickedPattern, setUserClickedPattern] = useState([]);
    const [level, setLevel] = useState(1);
    const [gameOn, setGameOn] = useState(false);
    const [header, setHeader] = useState("Press A Key or Click Here to Start");
    const [randomChosenColour, setRandomChosenColour] = useState("");

    /*********************************** START THE GAME********************************/

    // 1.1. First keypress for beginning by keyboard or click
    function startByClick() {
        if (!gameOn) {
            // setHeader("level 1");
            nextSequence();
            setGameOn(true);
        }
    }

    //  $(document).on("keypress", start);

    function clickOnColorButton() {
        var userChosenColor = this.id;
        setUserClickedPattern((prevValue) => [...prevValue, userChosenColor]);
        playSound(userChosenColor);
        animatePress(userChosenColor);
        //3. Check  the result of game's and user's patterns
        checkAnswer(userClickedPattern.length - 1);
    }

    // 3. Check game's and user's patterns
    function checkAnswer(currentLevel) {
        //3.1.check the last value of the pattern that was clicked and randomly generated
        if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
            //3.2. (while step 3.1. is true in every click) when  user's pattern length reach length of game's pattern start the next level
            if (gamePattern.length === userClickedPattern.length) {
                setTimeout(function () {
                    nextSequence();
                }, 1000);
            }
        } else {
            document.body.classList.add("game-over");
            setHeader("Game over, Press Any Key or Click Here to Restart");

            playWrondSound();
            setTimeout(function () {
                document.body.classList.remove("game-over");
            }, 200);
            startOver();
        }
    }

    // 4. Beginning (at step 2) and continuing of the game (in case answers are true in the step 3)
    function nextSequence() {
        setUserClickedPattern([]);
        setLevel((prevValue) => prevValue + 1);
        setHeader("level " + level);

        const randomNumber = Math.floor(Math.random() * 4);
        setRandomChosenColour(buttonColours[randomNumber]);
        setGamePattern((prevValue) => [...prevValue, buttonColours[randomNumber]]);
        playSound(randomChosenColour);
        //   animatePress(randomChosenColour);
    }
    console.log("randomChosenColour is " + randomChosenColour);
    console.log("gamePattern is " + gamePattern);

    // function that reset all saved information in the game to 0 lvl, so you should start from step 1
    function startOver() {
        setGameOn(false);
        setGamePattern([]);
        setLevel(0);
    }

    /************************SOUND AND ANIMATION ******************8*/

    //sound function for button
    function playSound(name) {
        const sound = new Audio("sounds/" + name + ".mp3");
        sound.play();
    }

    //sound function for wrong answers
    function playWrondSound() {
        var wrongSound = new Audio("sounds/wrong.mp3");
        wrongSound.play();
    }
    // animation for clicked button
    function animatePress(currentColour) {
        document.getElementById(currentColour).classList.add("pressed");
        setTimeout(function () {
            document.getElementById(currentColour).classList.remove("pressed");
        }, 100);
    }

    return (
        <>
            <h1 id="level-title" onClick={startByClick}>
                {header}
            </h1>
            <div className="container">
                <div className="row">
                    {buttonColours.map((el) => (
                        <ColorButton
                            key={el}
                            color={el}
                            onClick={clickOnColorButton}
                            randomChosen={randomChosenColour}
                        />
                    ))}
                </div>
            </div>
            <footer>Made by Alimardon Begov 2022</footer>
        </>
    );
};

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(<App />);
