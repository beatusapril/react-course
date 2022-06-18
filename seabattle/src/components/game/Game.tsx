import React, { useState } from "react";

import { Board } from "../board/Board";

import "./game.css"
import { Cell } from "./types/GameTypes";
import { countShip } from "./types/GameConsts";
import { StateCell } from "./types/GameTypes";
import { StateGameEnum } from "./types/GameTypes";
import { StatusMoveEnum } from "./types/GameTypes";

export function Game(){

    const emptyArr= ():Cell[][] =>  { let playerValues: Cell[][] =
        [[{ state: StateCell.EMPTY, countShip: 0 }, { state: StateCell.EMPTY, countShip: 0 }, { state: StateCell.EMPTY, countShip: 0 }, { state: StateCell.EMPTY, countShip: 0 }, { state: StateCell.EMPTY, countShip: 0 }],
        [{ state: StateCell.EMPTY, countShip: 0 }, { state: StateCell.EMPTY, countShip: 0 }, { state: StateCell.EMPTY, countShip: 0 }, { state: StateCell.EMPTY, countShip: 0 }, { state: StateCell.EMPTY, countShip: 0 }],
        [{ state: StateCell.EMPTY, countShip: 0 }, { state: StateCell.EMPTY, countShip: 0 }, { state: StateCell.EMPTY, countShip: 0 }, { state: StateCell.EMPTY, countShip: 0 }, { state: StateCell.EMPTY, countShip: 0 }],
        [{ state: StateCell.EMPTY, countShip: 0 }, { state: StateCell.EMPTY, countShip: 0 }, { state: StateCell.EMPTY, countShip: 0 }, { state: StateCell.EMPTY, countShip: 0 }, { state: StateCell.EMPTY, countShip: 0 }],
        [{ state: StateCell.EMPTY, countShip: 0 }, { state: StateCell.EMPTY, countShip: 0 }, { state: StateCell.EMPTY, countShip: 0 }, { state: StateCell.EMPTY, countShip: 0 }, { state: StateCell.EMPTY, countShip: 0 }]
        ];
        return playerValues;
    }

    const [player1Arr, setPlayer1Arr] = useState(emptyArr());
    const [player2Arr, setPlayer2Arr] = useState(emptyArr());
    const [stateG, setStateG] = useState(StateGameEnum.PLACEMENT);
    const [isPlayerOne, setIsPlayerOne] = useState(true);
    const [information, setInformation] = useState('Заполняет первый игрок');
    const [player1CountShip, setPlayer1CountShip] = useState(0);
    const [player2CountShip, setPlayer2CountShip] = useState(0);
    const [isResetChange, setIsResetChange] = useState(false);
    const [playGameClasses, setPlayGameClasses] = useState('game-board');
    const [infoMove, setInfoMove] = useState({ isFirstPlayerMove: false, info: '', status: StatusMoveEnum.START_MOVE, countMarkShip: 0, x: -1, y: -1 });
    const [isAttackContinue, setIsAttackContinue] = useState(false);
    const [boardClassName, setBoardClassName] = useState('game-board-hidden');


    const onChange = (x: number, y: number, player: number) => {
        if (stateG === StateGameEnum.PLACEMENT) {
            if (isPlayerOne && player1CountShip < countShip) {
                let playerArr = player1Arr;
                if (playerArr[y][x].countShip === 0) {
                    setPlayer1CountShip(player1CountShip + 1);
                    playerArr[y][x].state = StateCell.HAS_SHIP;
                }
                playerArr[y][x].countShip = 1;
                setPlayer1Arr(playerArr);
               return;
            } 
            if (!isPlayerOne && player2CountShip < countShip) {
                let playerArr = player2Arr;
                if (playerArr[y][x].countShip === 0) {
                    setPlayer2CountShip(player2CountShip + 1);
                    playerArr[y][x].state = StateCell.HAS_SHIP;
                }
                playerArr[y][x].countShip = 1;
                setPlayer2Arr(playerArr);
                return;
            }
            return;
        }
        if (stateG === StateGameEnum.GAME && isMarkValid(player) && infoMove.countMarkShip < 1) {
            let playerCells = player === 1 ? player1Arr : player2Arr;
            playerCells[y][x].state = StateCell.MARKED;
            setInfoMove({...infoMove, x: x, y: y, countMarkShip: infoMove.countMarkShip + 1 });
            if (player === 1) {
                setPlayer1Arr(playerCells);
            } else {
                setPlayer2Arr(playerCells);
            }
            return;
        }
    }

    function isAttacSquare(player: number) {
        return (infoMove.isFirstPlayerMove && player === 2)
            || (!infoMove.isFirstPlayerMove && player === 1)
    }

   function isMarkValid(player: number) {
        return infoMove.status === StatusMoveEnum.MARK
            && isAttacSquare(player)
            && infoMove.countMarkShip < 1

    }

    

    const apply = () =>{
        if (isPlayerOne) {
            if (player1CountShip !== countShip) {
                setInformation(`Количество кораблей  у игрока 1 - (${player1CountShip}) не равно ${countShip}`)
            } else {
                setIsPlayerOne(false);
                setInformation('Заполняет второй игрок');
            }
            return;
        }
        if (player2CountShip !== countShip) {
           setInformation(`Количество кораблей  у игрока 2 - (${player2CountShip}) не равно ${countShip}`);
           return;
        }

        setStateG(StateGameEnum.GAME);
        setInformation('Ход первого игрока');
        setInfoMove({...infoMove, isFirstPlayerMove: !infoMove.isFirstPlayerMove, info: '', status: StatusMoveEnum.START_MOVE, countMarkShip: 0});
        setPlayer1Arr(resetState(player1Arr));
        setPlayer2Arr(resetState(player2Arr))
    }

    function resetState(playerArr: Cell[][]) {
        for (let i = 0; i < playerArr.length; i++) {
            for (let j = 0; j < playerArr.length; j++) {
                playerArr[i][j].state = StateCell.EMPTY;
            }
        }
        return playerArr;
    }

    function reset() {
        setPlayer1Arr(emptyArr());
        setPlayer2Arr(emptyArr());
        setStateG(StateGameEnum.PLACEMENT);
        setIsPlayerOne(true);
        setInformation('Заполняет первый игрок');
        setPlayer1CountShip(0);
        setPlayer2CountShip(0);
        setIsResetChange(!isResetChange);
        setPlayGameClasses('game-board');
        setInfoMove({ isFirstPlayerMove: false, info: '', status: StatusMoveEnum.START_MOVE, countMarkShip: 0, x: -1, y: -1 });
        setIsAttackContinue(false);
        setBoardClassName('game-board-hidden');
    }

    const startMove = () =>{
        let infoMoveValue = infoMove;
        infoMoveValue.status = StatusMoveEnum.MARK;
        setInfoMove(infoMoveValue);
        let boardClassNameValue = boardClassName.replace('game-board-hidden', '');
        setBoardClassName(boardClassNameValue);
        let info = infoMove.isFirstPlayerMove ? 'Игрок 1 ходит' : 'Игрок 2 ходит';
        setInformation(info);
    }

    const attack = () => {
        let infoMoveValue = infoMove;
        if (infoMove.x === -1 || infoMove.y === -1 || infoMove.status !== StatusMoveEnum.MARK) {
            setInformation('Не выбрано поле' )
        }
        infoMoveValue.status = StatusMoveEnum.ATTACK;
        setInfoMove(infoMoveValue);
        let x = infoMove.x;
        let y = infoMove.y;
        let value = null;
        if (infoMove.isFirstPlayerMove) {
            value = player2Arr[y!][x!].countShip;
            if (player2Arr[y!][x!].countShip === 1) {
                setInformation('Игрок 1 попал');
                let countShip = player2CountShip - 1;
                let infoMoveValue = infoMove;
                infoMoveValue.countMarkShip = infoMove.countMarkShip - 1;
                let playerArr = player2Arr;
                playerArr[y!][x!].state = StateCell.KILLED;
                setPlayer2CountShip(countShip);
                setInfoMove(infoMove);
                setPlayer2Arr(playerArr);
                checkStateAfterAttack(countShip, 1);
            } else {
                let playerArr = player2Arr;
                playerArr[y!][x!].state = StateCell.MISSED;
                setPlayer2Arr(playerArr);
                missRegister(1);
            }
        } else {
            value = player1Arr[y!][x!].countShip;
            if (player1Arr[y!][x!].countShip === 1) {
                setInformation('Игрок 2 попал');
                let countShip = player1CountShip - 1;
                let infoMoveValue = infoMove;
                infoMoveValue.countMarkShip = infoMove.countMarkShip - 1;
                let playerStateArr = player1Arr;
                playerStateArr[y!][x!].state = StateCell.KILLED;
                setPlayer1CountShip(countShip);
                setInfoMove(infoMoveValue);
                setPlayer1Arr(playerStateArr);
                checkStateAfterAttack(countShip, 2);
            } else {
                let playerStateArr = player1Arr;
                playerStateArr[y!][x!].state = StateCell.MISSED;
                setPlayer1Arr(playerStateArr);
                missRegister(2);
            }
        }
        infoMoveValue.status = (value === 0) ? StatusMoveEnum.START_MOVE : StatusMoveEnum.MARK;
        infoMoveValue.x = -1;
        infoMoveValue.y = -1;
        setInfoMove({...infoMoveValue});
    }

    function missRegister(player: number) {
        let opponent = player === 1 ? 2 : 1;
        setInformation(`Игрок ${player} промахнулся. Ходит игрок ${opponent}`);
        disableInfoMove();
        hideBoard();
        setIsAttackContinue(false);
    }

    function hideBoard() {
        if (!boardClassName.includes('game-board-hidden')) {
            setBoardClassName(boardClassName + 'game-board-hidden');
        }
    }

    function checkStateAfterAttack(countShip: number, player: number) {
        if (countShip === 0) {
            setInformation(`Игрок ${player} выиграл`);
            setStateG(StateGameEnum.GAME_OVER);
            showNotKilledShip(player);
            return;
        } 

        setInformation(`Игрок ${player} продолжает атаковать`);
        setIsAttackContinue(true);
    }

    function showNotKilledShip(player: number) {
        let playerArr = player === 1 ? player1Arr : player2Arr;
        for (let y = 0; y < playerArr.length; y++) {
            for (let x = 0; x < playerArr[y].length; x++) {
                if (playerArr[y][x].countShip === 1 && playerArr[y][x].state === StateCell.EMPTY) {
                    playerArr[y][x].state = StateCell.HAS_SHIP;
                }
            }
        }
        if (player === 1) {
            setPlayer1Arr(playerArr);
            return;
        }
        if (player === 2) {
            setPlayer2Arr(playerArr);
            return;
        }
    }

    function disableInfoMove() {
        let infoMoveValue = infoMove;
        infoMoveValue.countMarkShip = infoMove.countMarkShip - 1;
        infoMoveValue.isFirstPlayerMove = !infoMove.isFirstPlayerMove;
        setInfoMove(infoMoveValue);
    }

    const onDoubleClick = (x: number, y: number, player: number) => {
        if (stateG === StateGameEnum.PLACEMENT) {
            let valueCell = player === 1 ? player1Arr[y][x].countShip : player2Arr[y][x].countShip;
            if (valueCell === 0) {
                return;
            }
            if (player === 1) {
                let playerArr = player1Arr;
                playerArr[y][x].state = StateCell.EMPTY;
                playerArr[y][x].countShip = 0;
                setPlayer1Arr(playerArr);
                setPlayer1CountShip(player1CountShip - 1);
                return;
            }
            if (player === 2) {
                let playerArr = player2Arr;
                playerArr[y][x].state = StateCell.EMPTY;
                playerArr[y][x].countShip = 0;
                setPlayer2Arr(playerArr);
                setPlayer2CountShip(player2CountShip - 1);
                return;
            }
        }
    }


      return <div style={{ width: "500px", margin: '0px auto' }}>
        {stateG === StateGameEnum.PLACEMENT && <Board player={(isPlayerOne ? 1 : 2)}
            playerArr={(isPlayerOne ? player1Arr : player2Arr)}
            onArrChange={onChange}
            onDoubleClick={onDoubleClick} />} <br />
        {stateG === StateGameEnum.PLACEMENT &&<div className="button-panel">
               <button onClick={apply}>Применить</button>
              <button onClick={reset}>Начать заново</button>
        </div>}
        {(stateG === StateGameEnum.GAME || stateG === StateGameEnum.GAME_OVER) && 
                <div className="game-board">
                    <div>
                        <h3 className="center">Поле первого игрока</h3>
                        <div className={boardClassName}>
                            <Board player={1}
                                playerArr={player1Arr}
                                onArrChange={onChange}
                                onDoubleClick={onDoubleClick} />
                        </div>
                    </div>
                    <div>
                        <h3 className="center">Поле второго игрока</h3>
                        <div className={boardClassName}>
                            <Board player={2}
                                playerArr={player2Arr}
                                onArrChange={onChange}
                                onDoubleClick={onDoubleClick} />
                        </div>
                    </div>
                </div>
        }
        {(stateG === StateGameEnum.GAME || stateG === StateGameEnum.GAME_OVER) && 
                <div className="button-panel">
                    <button disabled={infoMove.status !== StatusMoveEnum.START_MOVE || stateG === StateGameEnum.GAME_OVER || isAttackContinue} onClick={startMove}>Начать ход</button>
                    <button disabled={infoMove.status === StatusMoveEnum.START_MOVE || infoMove.status === StatusMoveEnum.ATTACK
                         || stateG === StateGameEnum.GAME_OVER 
                        || infoMove.x === -1
                        || infoMove.y === -1 
                    }
                        onClick={attack}>Атаковать
                    </button>
                    <button onClick={reset}>Начать заново</button>
                </div>
        }
        <div >{information}</div>
    </div>
}
