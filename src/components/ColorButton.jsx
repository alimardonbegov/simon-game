import React, { useEffect, useState } from "react";

export function ColorButton({ color, randomChosen, userChosen, onClick, buttonClicked, disabled }) {
    const [chosenByRandom, setChosenByRandom] = useState();
    const [chosenByUser, setChosenByUser] = useState();

    const checkRandomColor = () => (color == randomChosen ? setChosenByRandom("chosen-color") : "");
    const checkUserColor = () => (color == userChosen ? setChosenByUser("pressed") : "");

    useEffect(() => {
        checkRandomColor();
        const timeout = setTimeout(() => {
            setChosenByRandom("");
        }, 2000);
        return () => clearTimeout(timeout);
    }, [randomChosen]);

    useEffect(() => {
        checkUserColor();
        const timeout = setTimeout(() => {
            setChosenByUser("");
        }, 100);
        return () => clearTimeout(timeout);
    }, [userChosen, buttonClicked]);

    return (
        <button
            disabled={disabled}
            id={color}
            name={color}
            onClick={onClick}
            className={`btn ${color} ${chosenByRandom} ${chosenByUser}`}
        ></button>
    );
}
