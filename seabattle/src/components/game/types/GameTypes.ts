export interface Cell {
    countShip: number,
    state: StateCell
}

export enum StateCell {
    EMPTY = 'EMPTY',
    KILLED = 'KILLED',
    MARKED = 'MARKED',
    MISSED = 'MISSED',
    HAS_SHIP = 'HAS_SHIP'
}

export enum StateGameEnum {
    PLACEMENT = 'PLACEMENT',
    GAME = 'GAME',
    GAME_OVER = 'GAME_OVER'
}

export enum StatusMoveEnum{
    ATTACK = 'ATTACK',
    START_MOVE = 'START_MOVE',
    MARK = 'MARK'
}

export interface InfoMove {
    isFirstPlayerMove: boolean
    info: string,
    status: StatusMoveEnum,
    countMarkShip: number,
    x?: number | null,
    y?: number | null
}