export const SET_CARDS = 'SET_CARDS';
export const GET_UPDATED = 'GET_UPDATED'

export const setCards = (data) => {
  return {
    type: SET_CARDS,
    data
  }
}

export const getUpdated = (data) => {
  return {
    type: GET_UPDATED,
    data
  }
}
