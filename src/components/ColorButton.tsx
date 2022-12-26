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
    const randomChosenColour = useSelector((state: RootState) => state.game.randomChosenColour);
    const userChosenColour = useSelector((state: RootState) => state.game.userChosenColour);
    const buttonClicked = useSelector((state: RootState) => state.game.buttonClicked);

    const [chosenByRandom, setChosenByRandom] = useState<string>("");
    const [chosenByUser, setChosenByUser] = useState<string>("");

    const checkRandomColor = () =>
        color == randomChosenColour ? setChosenByRandom("chosen-color") : "";
    const checkUserColor = () => (color == userChosenColour ? setChosenByUser("pressed") : "");

    const clickOnButton = () => {
        dispatch(clickOnColorButton(color));
        dispatch(checkPattern());
    };
    useEffect(() => {
        checkRandomColor();
        const timeout = setTimeout(() => {
            setChosenByRandom("");
        }, 2000);
        return () => clearTimeout(timeout);
    }, [randomChosenColour]);

    useEffect(() => {
        checkUserColor();
        const timeout = setTimeout(() => {
            setChosenByUser("");
        }, 100);
        return () => clearTimeout(timeout);
    }, [userChosenColour, buttonClicked]);

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
