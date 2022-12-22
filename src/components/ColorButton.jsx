import React, { useEffect, useState } from "react";

export function ColorButton({ color, randomChosen }) {
    const [chosen, setChosen] = useState();

    function checkRandomColor() {
        color == randomChosen ? setChosen("chosen-color") : "";
    }

    useEffect(() => {
        checkRandomColor();
        const timeout = setTimeout(() => {
            setChosen("");
        }, 2000);
        return () => clearTimeout(timeout);
    }, [randomChosen]);

    return <div type="button" id={color} className={`btn ${color} ${chosen}`}></div>;
}
