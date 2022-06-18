import { AnyAction } from 'redux'
import { INCREMENT, DECREMENT } from '../constants/ActionTypes'

export interface StateStore{
    count: number
}

const initialState: StateStore = {
    count: 0
}

export function reducer(state = initialState, action: AnyAction) {
    switch (action.type) {
        case INCREMENT:
            return { ...state, count: state.count + 1 };
        case DECREMENT:
            return { ...state, count: state.count - 1 };
        default:
            return state;
    }
}