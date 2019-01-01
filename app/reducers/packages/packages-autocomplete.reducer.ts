import { actionWithPayload } from '../../actions';
import {
  PACKAGES_AUTOCOMPLETE_QUERY,
  PACKAGES_AUTOCOMPLETE_UPDATE_FINDINGS
} from '../../actions/packages/packages-autocomplete.actions';
import { isValidAutocompleteQuery } from '../../helpers/packages-autocomplete-validator.helper';

export function packagesAutocompleteReducer(
  state: {query: string, found: string[]} = {query: '', found: []},
  action: actionWithPayload<any>
): {query: string, found: string[]} {
  switch (action.type) {
    case PACKAGES_AUTOCOMPLETE_QUERY: {
      if (isValidAutocompleteQuery(action.payload)) {
        return state;
      }
      return {
        ...state,
        query: action.payload.trim()
      };
    }
    case PACKAGES_AUTOCOMPLETE_UPDATE_FINDINGS: {
      return {
        ...state,
        found: action.payload
      };
    }
    default:
      return state;
  }
}