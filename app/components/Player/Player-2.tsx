'use client'

import { ReactEventHandler, useEffect, useState } from "react";

type PlayerProps = {
    color: string;
    className?: string;
}

function Player(props: PlayerProps): React.JSX.Element {
    const [bgColor, setBgColor ] = useState(props.color);
    const [value, setValue] = useState('0');

    useEffect(() => {
        setBgColor(props.color);
        setValue(value);
    }, [props.color, value]);

    function handleInput(e: React.ChangeEvent<HTMLInputElement> ) {
        setValue(e.target.value);
    }

    return (     
        <li className={`bg-slate-50 py-8 px-4 mb-1 flex justify-between w-[580px] ${props.className}`}>
            <span>Player Name</span>
            <span className="px-2">
            <input 
                className="p-2 rounded-md w-[120px] text-black" 
                type="number" 
                name="player-order"
                onChange={handleInput}

            />
            </span>
        </li>
    );
}

export default Player;