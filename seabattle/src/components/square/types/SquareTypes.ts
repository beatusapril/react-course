import { StateCell } from "../../game/types/GameTypes";

export interface SquareProps {
    x: number,
    y: number,
    onSquareChange: (x: number, y: number, player: number) => void,
    player: number,
    value: number,
    stateCell: StateCell,
    onDoubleClick: (x: number, y: number, player: number) => void;

}