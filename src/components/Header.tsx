import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { nextSequence, startByClick, startOver } from "../redux/gameSlice";

export const Header: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const gameOn = useSelector((state: RootState) => state.game.gameOn);
    const header = useSelector((state: RootState) => state.game.header);

    const gameStart = async () => {
        if (gameOn === false) {
            console.log("handle gameStart in gameOn");

            await dispatch(startByClick());
            dispatch(nextSequence());
        } else if (header === "Game over, Press Any Key or Click Here to Restart") {
            console.log("handle gameStart in header");

            await dispatch(startOver());
            dispatch(nextSequence());
        }
    };
    return (
        <h1 id="level-title" onClick={gameStart}>
            {header}
        </h1>
    );
};
