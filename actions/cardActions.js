export const SET_CARDS = 'SET_CARDS';
export const EDIT_STATUS = 'EDIT_STATUS';
export const DEL_CARD = 'DEL_CARD';
export const TOGGLE_EDIT_CARD = 'TOGGLE_EDIT_CARD';

export const setCards = (data) => {
  return {
    type: SET_CARDS,
    data
  }
}

export const editStatus = (data) => {
  return {
    type: EDIT_STATUS,
    data
  }
}

export const delCard = (item) => {
  return {
    type: DEL_CARD,
    item
  }
}

export const toggleEditCard = (data, bool) => {
  return {
    type: TOGGLE_EDIT_CARD,
    data,
    bool
  }
}

