import "./styles/styles.css";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { ColorButton } from "./components/ColorButton.jsx";
import Sounds from "./utils/Sounds";

const App = () => {
    const buttonColours = ["green", "red", "yellow", "blue"];

    const [gamePattern, setGamePattern] = useState([]);
    const [randomChosenColour, setRandomChosenColour] = useState("");

    const [userClickedPattern, setUserClickedPattern] = useState([]);
    const [userChosenColour, setUserChosenColour] = useState("");

    const [buttonClicked, setButtonClicked] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [level, setLevel] = useState(1);
    const [gameOn, setGameOn] = useState(false);
    const [header, setHeader] = useState("Press A Key or Click Here to Start");

    const startByClick = () => {
        if (!gameOn) {
            nextSequence();
            setGameOn(true);
        }
    };

    const startOver = () => {
        setGameOn(false);
        setGamePattern([]);
        setLevel(1);
        setButtonDisabled(true);
    };

    const wrongChoice = () => {
        document.body.classList.add("game-over");
        setHeader("Game over, Press Any Key or Click Here to Restart");
        Sounds.playWrongSound();
        setTimeout(function () {
            document.body.classList.remove("game-over");
        }, 200);
        startOver();
    };

    //  $(document).on("keypress", start);

    const clickOnColorButton = (el) => {
        setButtonClicked((prevValue) => !prevValue);
        el !== undefined && setUserClickedPattern((prevValue) => [...prevValue, el]);
        Sounds.playButtonSound(el);
        setUserChosenColour(el);
    };

    function nextSequence() {
        const randomNumber = Math.floor(Math.random() * 4);
        setUserClickedPattern([]);
        setLevel((prevValue) => prevValue + 1);
        setHeader("level " + level);
        setRandomChosenColour(buttonColours[randomNumber]);
        setGamePattern((prevValue) => [...prevValue, buttonColours[randomNumber]]);
        Sounds.playButtonSound(buttonColours[randomNumber]);
    }

    useEffect(() => {
        const currentIndex = userClickedPattern.length - 1;

        if (gamePattern.length === 0 && userClickedPattern.length === 0) {
        } else if (gamePattern.length > userClickedPattern.length) {
            setButtonDisabled(false);
            if (gamePattern[currentIndex] === userClickedPattern[currentIndex]) {
            } else {
                wrongChoice();
            }
        } else if (gamePattern.length == userClickedPattern.length) {
            setButtonDisabled(true);
            if (gamePattern[currentIndex] === userClickedPattern[currentIndex]) {
                setTimeout(function () {
                    nextSequence();
                }, 1000);
            } else {
                wrongChoice();
            }
        }
    }, [userClickedPattern]);

    return (
        <>
            <h1 id="level-title" onClick={startByClick}>
                {header}
            </h1>
            <div className="container">
                {buttonColours.map((el) => (
                    <ColorButton
                        key={el}
                        color={el}
                        onClick={() => clickOnColorButton(el)}
                        randomChosen={randomChosenColour}
                        userChosen={userChosenColour}
                        buttonClicked={buttonClicked}
                        disabled={buttonDisabled}
                    />
                ))}
            </div>
            <footer>Made by Alimardon Begov 2022</footer>
        </>
    );
};

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(<App />);
