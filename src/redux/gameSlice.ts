import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Sounds from "../utils/Sounds";

interface IGameSlice {
    buttonColours: Array<string>;
    gamePattern: Array<string>;
    randomChosenColour: string;
    userClickedPattern: Array<string>;
    userChosenColour: string;
    buttonClicked: boolean;
    buttonDisabled: boolean;
    level: number;
    gameOn: boolean;
    header: string;
}

const initialState: IGameSlice = {
    buttonColours: ["green", "red", "yellow", "blue"],
    gamePattern: [],
    randomChosenColour: "",
    userClickedPattern: [],
    userChosenColour: "",
    buttonClicked: false,
    buttonDisabled: false,
    level: 0,
    gameOn: false,
    header: "Press A Key or Click Here to Start",
};

export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        startByClick: (state) => {
            state.gameOn = true;
        },

        startOver: (state) => {
            state.gameOn = false;
            state.gameOn = true;
            state.gamePattern = [];
            state.level = 0;
            state.buttonDisabled = true;
        },

        clickOnColorButton: (state, action: PayloadAction<string>) => {
            state.buttonClicked = !state.buttonClicked;
            action.payload !== undefined && state.userClickedPattern.push(action.payload);
            state.userChosenColour = action.payload;
            Sounds.playButtonSound(action.payload);
        },

        nextSequence: (state) => {
            const randomNumber = Math.floor(Math.random() * 4);
            state.userClickedPattern = [];
            state.level = state.level + 1;
            state.header = `level ${state.level}`;
            state.randomChosenColour = state.buttonColours[randomNumber];
            state.gamePattern.push(state.randomChosenColour);
            Sounds.playButtonSound(state.randomChosenColour);
        },

        checkPattern: (state) => {
            const currentIndex = state.userClickedPattern.length - 1;
            if (state.gamePattern.length === 0 && state.userClickedPattern.length === 0) {
            } else if (state.gamePattern.length > state.userClickedPattern.length) {
                state.buttonDisabled = false;
                if (state.gamePattern[currentIndex] === state.userClickedPattern[currentIndex]) {
                } else {
                    document.body.classList.add("game-over"); //! dublicate
                    state.header = "Game over, Press Any Key or Click Here to Restart";
                    Sounds.playWrongSound();
                    setTimeout(() => {
                        document.body.classList.remove("game-over");
                    }, 200);
                    state.gamePattern = []; //! dublicate
                    state.level = 0;
                    state.buttonDisabled = true;
                }
            } else if (state.gamePattern.length === state.userClickedPattern.length) {
                state.buttonDisabled = true;
                if (state.gamePattern[currentIndex] === state.userClickedPattern[currentIndex]) {
                    const randomNumber = Math.floor(Math.random() * 4); //! dublicate
                    state.userClickedPattern = [];
                    state.level = state.level + 1;
                    state.header = `level ${state.level}`;
                    state.randomChosenColour = state.buttonColours[randomNumber];
                    state.gamePattern.push(state.buttonColours[randomNumber]);
                    Sounds.playButtonSound(state.buttonColours[randomNumber]);
                } else {
                    document.body.classList.add("game-over"); //! dublicate
                    state.header = "Game over, Press Any Key or Click Here to Restart";
                    Sounds.playWrongSound();
                    setTimeout(() => {
                        document.body.classList.remove("game-over");
                    }, 200);
                    state.gamePattern = []; //! dublicate
                    state.level = 0;
                    state.buttonDisabled = true;
                }
            }
        },
    },
});

export const { startByClick, startOver, clickOnColorButton, nextSequence, checkPattern } =
    gameSlice.actions;
