import {List, Map} from 'immutable';
import { DEL_CARD } from '../actions/cardDelete';
import { SET_CARDS } from '../actions/setCards';
import { TOGGLE_FORM, ONCHANGE_FORM, ONSUBMIT_FORM } from '../actions/formActions';

const initialState = Map.of('cards', [], 'showForm', false);
let showform = false;

const indexCards = (indexed, showform) => {
  console.log('indexed: ', indexed);
  return Map.of(
    'cards', List(indexed),
    'showForm', showform,
    'newCard', Map.of('title', '', 'priority', '', 'createdBy', '', 'assignedTo', '')
    );
}

const cardReducer = ( state = initialState, action) => {
  let newState = state;
  switch(action.type) {
    case SET_CARDS:
      let indexed = action.data.map((item, i) => {
        item['index'] = i
        return item;
      })
      return indexCards(indexed, showform)
    case DEL_CARD:
    return state.updateIn(['cards'], node => {
      return node.delete(action.item.index)
    });
    case TOGGLE_FORM:
      showform = action.bool;
      return state.updateIn(['showForm'], bool => {
        return bool = action.bool;
      })
    case ONCHANGE_FORM:
      let field = action.value.field
      return state.updateIn(['newCard'], map => {
        return map.updateIn([field], (obj) => {
          console.log(obj);
          return obj = action.value.value
        })
      })
    case ONSUBMIT_FORM:
    let newCard = action.newCard;
    newCard['status'] = 'queue';
    console.log(action.newCard);
      return state.updateIn(['cards'], node => {
        newCard['key'] = node.size;
        newCard['id'] = node.size;
        return node.push(newCard)
      })

    default:
      return newState;
  }
}

export default cardReducer;