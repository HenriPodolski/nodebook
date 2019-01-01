import { ofType } from 'redux-observable';
import { withLatestFrom } from 'rxjs/operators';
import { map } from 'rxjs/internal/operators';
import {
  PACKAGES_AUTOCOMPLETE_QUERY,
  stateAction
} from '../actions/packages/packages-autocomplete.actions';
import { isValidAutocompleteQuery } from '../helpers/packages-autocomplete-validator.helper';
import { queryNpm } from '../services/npm/npm.service';

export const performQueryEpic = (action$, state$) => action$.pipe(
  ofType(PACKAGES_AUTOCOMPLETE_QUERY),
  withLatestFrom(state$),
  map(([action, state]) => {
    console.log('performQueryEpic', isValidAutocompleteQuery(action.payload));
    if (isValidAutocompleteQuery(action.payload)) {
      const result = queryNpm(action.payload);
      console.log(result);
    }

    return stateAction();
  })
);