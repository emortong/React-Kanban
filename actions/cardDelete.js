export const DEL_CARD = 'DEL_CARD';

export const delCard = (item) => {
  return {
    type: DEL_CARD,
    item
  }
}