export const TOGGLE_FORM = 'TOGGLE_FORM';

export const toggleForm = (bool) => {
  return {
    type: TOGGLE_FORM,
    bool
  }
}

export const ONCHANGE_FORM = 'ONCHANGE_FORM';

export const onChangeForm = (value) => {
  return {
    type: ONCHANGE_FORM,
    value
  }
}

export const ONSUBMIT_FORM = 'ONSUBMIT_FORM';

export const onSubmitForm = (newCard) => {
  return {
    type: ONSUBMIT_FORM,
    newCard
  }
}