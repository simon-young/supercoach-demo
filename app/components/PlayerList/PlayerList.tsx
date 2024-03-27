'use client';

import { useRef, useState } from "react";
import Player from "../Player/Player";
import Button from "../Button/Button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Flip } from "gsap/dist/Flip";
import './styles.css';
import initialData from './mock-data';

// Register GSAP plugins to prevent treeshaking
gsap.registerPlugin(Flip, useGSAP);

// Create a batch for ladder animations
let batch = Flip.batch("ladder");
batch.data = [ ...initialData ];

function PlayerList() {
    // Declare useRefs
    const playerList = useRef<HTMLOListElement>(null);
    const playerRow = useRef<HTMLDivElement>(null);

    // Set player data array into state
    const [players, setPlayers] = useState(initialData);
    // Capture Flip state into React state
    const [layout, setLayout] = useState(() => ({
        state: Flip.getState(playerRow.current)
    }));

    const { contextSafe } = useGSAP({scope: playerList});

    // Integer for incrementing player order
    let i = 0;

    const handleDelete = contextSafe((event: React.MouseEvent<HTMLButtonElement>) => {   
        // Check player name and team to be deleted
        const playerName = event.currentTarget.parentElement?.parentElement?.querySelector('.player-name')?.innerHTML;
        const playerTeam = event.currentTarget.parentElement?.parentElement?.querySelector('.team-name')?.innerHTML;

        // Check players with same name but on different teams don't get filtered and create new array
        const result = players.filter((player) => player.name !== playerName || player.team !== playerTeam);

        // Add new array to players variable
        setPlayers(result);
    })

    // Reset players array
    function handleReset() {
        setPlayers(initialData);
    }

    // Update player score
    const handleScoreUpdate = contextSafe(() => {   
        setLayout({
            state: Flip.getState((".player-row"), {
                props: "backgroundColor"
            })
        });
        const updatePlayers = players.map((player) => {
            // Randomly generate number to add to player points
            const num = Math.floor(Math.random() * 20);

            return {
                ...player,
                points: player.points + num,
            };
        });

        // Sort new array by player points
        const sortedPlayers = updatePlayers.toSorted((a, b) => b.points - a.points);
        
        // Update player array
        setPlayers(sortedPlayers);  
    });

    useGSAP(() => {
        // Animate from the preious state to the current one
        Flip.from(layout.state, {
            duration: 0.8,
            ease: 'power1.inOut',
            stagger: 0.2,
            // nested: true,
            absolute: true,
            simple: true,
            // toggleClass: 'flipping',
            // onComplete: () => console.log('onComplete: fired'),

        });
        
    }, { dependencies: [players], scope: playerList, revertOnUpdate: true});

    return (
        <div className="min-w-[580px]">

            <Button className="mx-2" onClick={handleScoreUpdate}>Test score update</Button>
            <Button className="mx-2 border-slate-800 bg-transparent !text-slate-800 hover:!bg-slate-300 hover:border-slate-300" onClick={handleReset}>Reset</Button>

            <ol className="my-4 player-list" ref={playerList}>
                { players.map((player) => {
                        i++; // Create a count for position order

                        return (
                            <div key={i} className="relative player-row" data-flip-id={player.id}>
                                <Player 
                                    pos={i} 
                                    count={String(i)} 
                                    name={player.name}
                                    playerValue={player.player_value}
                                    team={player.team}
                                    teamLogo={player.team_logo} 
                                    playerPosition={player.player_pos}
                                    ownership={player.ownership}
                                    breakEven={player.break_even}
                                    points={player.points}
                                />

                                <div className="absolute right-[-84px] top-[20px]">
                                    <button 
                                    className="p-2 px-4 border border-slate-300 rounded-full hover:bg-slate-300"
                                    id={String(i)}
                                    onClick={handleDelete}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        );                      
                })}
            </ol>
        </div>
    );
}

export default PlayerList;