export const TITLE_STATE = 'TITLE_STATE';
export const TITLE_EDIT = 'TITLE_EDIT';
export const TITLE_CANCEL_EDIT = 'TITLE_CANCEL_EDIT';
export const TITLE_UPDATE = 'TITLE_UPDATE';

export function updateAction(title) {
  return {
    type: TITLE_UPDATE,
    title
  };
}

export function editAction() {
  return {
    type: TITLE_EDIT
  };
}

export function cancelEditAction() {
  return {
    type: TITLE_CANCEL_EDIT
  };
}

export function stateAction() {
  return {
    type: TITLE_STATE
  };
}