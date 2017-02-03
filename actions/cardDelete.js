export const DEL_ITEM = 'DEL_ITEM';

export const delItem = (item) => {
  return {
    type: DEL_ITEM,
    item
  }
}