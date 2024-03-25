'use client'
import Image from "next/image";

type PlayerProps = {
    pos?: number;
    className?: string;
    count: string;
    name: string;
    playerPosition: string;
    playerValue: number;
    team: string;
    teamLogo: string;
    ownership: number;
    breakEven: number;
    points: number;
}

function Player(props: PlayerProps): React.JSX.Element {
    return (     
        <li 
            className={`bg-slate-50 py-3 px-3 mb-1 flex justify-start w-[580px] items-center gap-5 relative ${props.className}`} 
            id={props.count}
        >
            <span className="inline-block min-w-[32px] text-center font-bold text-lg text-slate-400">
                {props.pos}
            </span>
            <div>
                <Image 
                    src={props.teamLogo}
                    alt={props.team}
                    width={48}
                    height={48}
                    className="min-w-[48px]"
                />
                <span className="hidden team-name">{props.team}</span>
            </div>

            <div className="grow min-w-[200px]">
                <h6 className="font-semibold text-2xl player-name">{props.name}</h6>
                <span className="text-slate-500 text-sm">${props.playerValue.toLocaleString()} | {props.playerPosition}</span>
            </div>

            <div className="flex flex-row gap-6 text-2xl font-semibold w-[210px]">
                <span className="text-slate-500 w-12 text-right">{props.ownership < 1 ? '< 1' : props.ownership}%</span>
                <span className="text-[#B79941] w-12 text-center">{props.breakEven}</span>
                <span className="text-[#8AC036] text-[40px]">{props.points}</span>
            </div>
            
        </li>
    );
}

export default Player;