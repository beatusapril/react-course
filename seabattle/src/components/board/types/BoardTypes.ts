import { Cell } from "../../game/types/GameTypes";

export interface BoardProps {
    playerArr: Cell[][],
    player: number,
    onArrChange: ( x: number, y: number, player: number) => void,
    onDoubleClick: (x: number, y: number, player: number) => void;
  }