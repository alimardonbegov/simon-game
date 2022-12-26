import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import { ColorButton } from "./components/ColorButton";
import { checkPattern } from "./redux/gameSlice";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

export const App = () => {
    const dispatch = useDispatch<AppDispatch>();
    const userClickedPattern = useSelector((state: RootState) => state.game.userClickedPattern);
    const buttonColours = useSelector((state: RootState) => state.game.buttonColours);

    useEffect(() => {
        dispatch(checkPattern());
    }, [userClickedPattern]);

    return (
        <>
            <Header />
            <div className="container">
                {buttonColours.map((el) => (
                    <ColorButton key={el} color={el} />
                ))}
            </div>
            <Footer />
        </>
    );
};
