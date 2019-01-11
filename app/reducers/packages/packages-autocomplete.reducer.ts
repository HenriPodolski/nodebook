import { actionWithPayload } from '../../actions';
import {
  PACKAGES_AUTOCOMPLETE_QUERY,
  PACKAGES_AUTOCOMPLETE_UPDATE_FINDINGS
} from '../../actions/packages/packages-autocomplete.actions';
import { isValidAutocompleteQuery } from '../../helpers/packages-autocomplete-validator.helper';
import { IPackagesAutocomplete } from '../../shared/interfaces/packages.interface';
import { rootState } from '../../store/state';

export function packagesAutocompleteReducer(
  state: IPackagesAutocomplete = rootState.packagesAutocomplete,
  action: actionWithPayload<any>
): IPackagesAutocomplete {
  switch (action.type) {
    case PACKAGES_AUTOCOMPLETE_QUERY: {
      let query = action.payload.trim();

      if (!isValidAutocompleteQuery(query)) {
        query = '';
      }
      return {
        ...state,
        query
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