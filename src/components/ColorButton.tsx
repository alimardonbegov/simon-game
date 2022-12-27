import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { checkPattern, clickOnColorButton } from "../redux/gameSlice";

interface IColorButton {
    color: string;
}

export const ColorButton: React.FC<IColorButton> = ({ color }) => {
    const dispatch = useDispatch<AppDispatch>();

    const disabled = useSelector((state: RootState) => state.game.buttonDisabled);
    const randomColor = useSelector((state: RootState) => state.game.randomChosenColour);
    const userColour = useSelector((state: RootState) => state.game.userChosenColour);
    const buttonClicked = useSelector((state: RootState) => state.game.buttonClicked);

    const [chosenByRandom, setChosenByRandom] = useState<string>("");
    const [chosenByUser, setChosenByUser] = useState<string>("");

    const checkRandomColor = () => (color == randomColor ? setChosenByRandom("chosen-color") : "");
    const checkUserColor = () => (color == userColour ? setChosenByUser("pressed") : "");

    const clickOnButton = () => {
        //! rewrite code below for next sequence
        dispatch(clickOnColorButton(color));
        setTimeout(() => {
            console.log("checked timeout ");
            dispatch(checkPattern());
        }, 1500);
    };

    //  class random colors
    useEffect(() => {
        checkRandomColor();
        const timeout = setTimeout(() => {
            setChosenByRandom("");
        }, 2000);
        return () => clearTimeout(timeout);
    }, [randomColor]);

    //  class user colors
    useEffect(() => {
        checkUserColor();
        const timeout = setTimeout(() => {
            setChosenByUser("");
        }, 100);
        return () => clearTimeout(timeout);
    }, [userColour, buttonClicked]);

    return (
        <button
            disabled={disabled}
            id={color}
            name={color}
            onClick={clickOnButton}
            className={`btn ${color} ${chosenByRandom} ${chosenByUser}`}
        ></button>
    );
};
