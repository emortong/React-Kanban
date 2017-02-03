import {List} from 'immutable';
import { DEL_CARD } from '../actions/cardDelete';
import { SET_CARDS } from '../actions/setCards';

const initialState = List();

const redditPostReducer = ( state = initialState, action) => {
  let newState = state;
  switch(action.type) {
    case SET_CARDS:
      return List(action.data);
    case DEL_CARD:
      return state.delete(action.item.index);
    default:
      return newState;
  }
}

export default redditPostReducer;