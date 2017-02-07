export const SET_CARDS = 'SET_CARDS';
export const EDIT_STATUS = 'EDIT_STATUS';
export const DEL_CARD = 'DEL_CARD';
export const ONCHANGE_EDIT = 'ONCHANGE_EDIT';

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

export const onChangeEdit = (data) => {
  return {
    type: ONCHANGE_EDIT,
    data
  }
}

