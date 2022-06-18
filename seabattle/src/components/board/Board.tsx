//import { render } from "@testing-library/react";
import React from "react";
import { render } from "react-dom";

import { Square } from "../square/Square";

import "./board.css";
import { countColumnArr, countRowArr } from "./types/BoardConsts";
import { BoardProps } from "./types/BoardTypes";

export function Board(props: BoardProps) {
    return (
      <div>
        {countRowArr.map(numberY =>
          <div className="row" key={numberY}>
            {countColumnArr.map(numberX =>
              <Square x={numberX}
                y={numberY}
                key={`${numberY}-${numberX}`}
                value={props.playerArr[numberY][numberX].countShip}
                onSquareChange={props.onArrChange}
                player={props.player}
                stateCell={props.playerArr[numberY][numberX].state}
                onDoubleClick={props.onDoubleClick}/>)}
          </div>)}
      </div>
    )
}