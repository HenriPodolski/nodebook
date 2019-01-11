export const PACKAGES_AUTOCOMPLETE_QUERY = 'PACKAGES_AUTOCOMPLETE_QUERY';
export const PACKAGES_AUTOCOMPLETE_UPDATE_FINDINGS = 'PACKAGES_AUTOCOMPLETE_UPDATE_FINDINGS';
export const PACKAGES_AUTOCOMPLETE_STATE = 'PACKAGES_AUTOCOMPLETE_STATE';


export function queryAction(query: string) {
  return {
    type: PACKAGES_AUTOCOMPLETE_QUERY,
    payload: query
  };
}

export function updateFindingsAction(found: any[]) {
  return {
    type: PACKAGES_AUTOCOMPLETE_UPDATE_FINDINGS,
    payload: found
  };
}

export function stateAction() {
  return {
    type: PACKAGES_AUTOCOMPLETE_STATE
  };
}