'use client';
import { useEffect, useRef, useState } from "react";
import Player from "../Player/Player";
import Button from "../Button/Button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Flip } from "gsap/Flip";
import {
    CSSTransition,
    TransitionGroup,
  } from 'react-transition-group';
import './styles.css';

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(Flip);

// Mock Player Data
const initialData = [
    {
        name: 'Max Gawn',
        player_value: 432000,
        player_pos: 'RUC',
        team: 'Melbourne Demons',
        team_logo: '/images/team-logos/melb.svg',
        ownership: 24,
        break_even: 103,
        points: 197,
        id: 'mg-melb',
    },
    {
        name: 'Christian Petracca',
        player_value: 641900,
        player_pos: 'MID',
        team: 'Melbourne Demons',
        team_logo: '/images/team-logos/melb.svg',
        ownership: 43,
        break_even: 124,
        points: 113,
        id: 'cp-melb',
    },
    {
        name: 'Oscar McInerney',
        player_value: 522700,
        player_pos: 'RUC',
        team: 'Brisbane Lions',
        team_logo: '/images/team-logos/bl.svg',
        ownership: 0.68,
        break_even: 87,
        points: 108,
        id: 'om-bl',
    },
    {
        name: 'Jack Viney',
        player_value: 5225300,
        player_pos: 'MID',
        team: 'Melbourne Demons',
        team_logo: '/images/team-logos/melb.svg',
        ownership: 2,
        break_even: 137,
        points: 104,
        id: 'jv-melb',
    },
    {
        name: 'Will Ashcroft',
        player_value: 457500,
        player_pos: 'MID',
        team: 'Brisbane Lions',
        team_logo: '/images/team-logos/bl.svg',
        ownership: 19,
        break_even: 65,
        points: 102,
        id: 'wa-bl',
    },
    {
        name: 'Jake Bowey',
        player_value: 353700,
        player_pos: 'DEF',
        team: 'Melbourne Demons',
        team_logo: '/images/team-logos/melb.svg',
        ownership: 0.2,
        break_even: 72,
        points: 96,
        id: 'jb-melb',
    },
    {
        name: 'Hugh McCluggage',
        player_value: 547900,
        player_pos: 'MID',
        team: 'Brisbane Lions',
        team_logo: '/images/team-logos/bl.svg',
        ownership: 0.4,
        break_even: 19,
        points: 92,
        id: 'hmcm-bl',
    },
    {
        name: 'Jarryd Lyons',
        player_value: 365800,
        player_pos: 'MID',
        team: 'Brisbane Lions',
        team_logo: '/images/team-logos/bl.svg',
        ownership: 0.4,
        break_even: 55,
        points: 89,
        id: 'jl-bl',
    },
    {
        name: 'Harris Andrews',
        player_value: 495800,
        player_pos: 'DEF',
        team: 'Brisbane Lions',
        team_logo: '/images/team-logos/bl.svg',
        ownership: 3,
        break_even: 24,
        points: 87,
        id: 'ha-bl',
    },
    {
        name: 'Angus Brayshaw',
        player_value: 484300,
        player_pos: 'DEF/MID',
        team: 'Melbourne Demons',
        team_logo: '/images/team-logos/melb.svg',
        ownership: 6,
        break_even: 84,
        points: 83,
        id: 'ab-melb',
    },
];

function PlayerList() {
    // Set player data array into state
    const [players, setPlayers] = useState(initialData);

    const playerRow = useRef<HTMLDivElement>(null);
    const playerList = useRef<HTMLElement>(null);

    const { contextSafe } = useGSAP({scope: playerList});

    // Integer for incrementing player order
    let i = 0;


    function handleDelete(event: React.MouseEvent<HTMLButtonElement>) {
        // Check player name and team to be deleted
        const playerName = event.currentTarget.parentElement?.parentElement?.querySelector('.player-name')?.innerHTML;
        const playerTeam = event.currentTarget.parentElement?.parentElement?.querySelector('.team-name')?.innerHTML;

        // Check players with same name but on different teams don't get filtered and create new array
        const result = players.filter((player) => player.name !== playerName || player.team !== playerTeam);

        // Add new array to players variable
        setPlayers(result);
    }

    // Reset players array
    function handleReset() {
        setPlayers(initialData);
    }

    // Update player score
    const handleScoreUpdate = contextSafe(() => {
        // Get current state for FLIP - https://gsap.com/docs/v3/Plugins/Flip/
        // const state = Flip.getState('.player-row');

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

        // todo - all Flip.from(state, options)
        // Flip.from(state, {
        //     duration: 1,
        //     ease: 'power1',
        //     absolute: true,
        //     nested: true,
        //     zIndex: 999,
        //     simple: true
        // });

    });
    const[ bounds, setBounds] = useState();
    useGSAP(() => {
        console.log('useGSAP has fired');
        
    }, {dependencies: [players], scope: playerList});

    return (
        <div className="min-w-[580px]">

            <Button className="mx-2" onClick={handleScoreUpdate}>Test score update</Button>
            <Button className="mx-2 border-slate-800 bg-transparent !text-slate-800 hover:!bg-slate-300 hover:border-slate-300" onClick={handleReset}>Reset</Button>

            <TransitionGroup className="my-4 player-list" component="ol">
                { players.map((player) => {
                        i++; // Create a count for position order
                        console.log(player);

                        return (
                        <CSSTransition key={i} timeout={500} className="player">
                            <div className="relative player-row transition-all">
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
                        </CSSTransition>
                    );                      
                })}
            </TransitionGroup>
        </div>
    );
}

export default PlayerList;