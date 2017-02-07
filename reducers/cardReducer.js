import {List, Map} from 'immutable';
import { SET_CARDS, EDIT_STATUS, DEL_CARD, TOGGLE_EDIT_CARD } from '../actions/cardActions';
import { TOGGLE_FORM, ONCHANGE_FORM, ONSUBMIT_FORM } from '../actions/formActions';

const initialState = Map.of('cards', [], 'showForm', false);
let showForm = false;

const indexCards = (indexed, showform) => {
  return Map.of(
    'cards', List(indexed),
    'showForm', showForm,
    'newCard', Map.of('title', '', 'priority', '', 'createdBy', '', 'assignedTo', '')
    );
}

const cardReducer = ( state = initialState, action) => {
  let newState = state;
  switch(action.type) {
    case SET_CARDS:
      let indexed = action.data.map((item, i) => {
        item['index'] = i
        item['editCard'] = false;
        return item;
      })
      return indexCards(indexed, showForm)
    case DEL_CARD:
    return state.updateIn(['cards'], node => {
      return node.delete(action.item.index)
    })
    case TOGGLE_EDIT_CARD:
      return state.updateIn(['cards'], card => {
        return card.update(action.data.index, props => {
          props['editCard'] = action.bool
          console.log(props);
          return props
        })
      })
    case TOGGLE_FORM:
      showForm = action.bool;
      return state.updateIn(['showForm'], bool => {
        return bool = action.bool;
      })
    case ONCHANGE_FORM:
      let field = action.value.field
      return state.updateIn(['newCard'], map => {
        return map.updateIn([field], (obj) => {
          return obj = action.value.value
        })
      })
    case ONSUBMIT_FORM:
    let newCard = action.newCard;
    newCard['status'] = 'queue';
      return state.updateIn(['cards'], node => {
        newCard['key'] = node.size;
        return node.push(newCard)
      })
    default:
      return newState;
  }
}

export default cardReducer;