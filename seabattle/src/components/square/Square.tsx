import  { useEffect, useState } from "react";
import { StateCell } from "../game/types/GameTypes";

import "./square.css"
import { SquareProps } from "./types/SquareTypes";

export function Square(props: SquareProps): any{

    const [classNames, setClassNames] = useState('square');

    useEffect(()=>{changeClass(); }, [props.stateCell]);

    const changeClass = () => {
        switch(props.stateCell){
            case StateCell.EMPTY: setClassNames('square');
            break;
            case StateCell.KILLED: setClassNames('square square_attacked');
            break;
            case StateCell.MARKED: setClassNames('square square_marked');
            break;
            case StateCell.MISSED: setClassNames('square square_missed');
            break;
            case StateCell.HAS_SHIP: setClassNames('square square_busy');
            break;
            default: setClassNames('square');
        }
    }

    const handleDoubleClick = () => {
        props.onDoubleClick(props.x, props.y, props.player);
    }

    function handleClick(){
       props.onSquareChange(props.x, props.y, props.player);
    }

    return (<div className={classNames} onClick={handleClick} onDoubleClick={handleDoubleClick} />);
}