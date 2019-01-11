import { ofType } from 'redux-observable';
import { withLatestFrom } from 'rxjs/operators';
import { switchMap } from 'rxjs/internal/operators';
import {
  PACKAGES_AUTOCOMPLETE_QUERY, queryAction,
  updateFindingsAction
} from '../actions/packages/packages-autocomplete.actions';
import { isValidAutocompleteQuery } from '../helpers/packages-autocomplete-validator.helper';
import { queryNpm } from '../services/npm/npm.service';
import { from, of } from '../../node_modules/rxjs';
import { PACKAGES_CANCEL_CONFIGURE } from '../actions/packages/packages.actions';
import { actionWithPayload } from '../actions';

export const performQueryEpic = (action$, state$) => action$.pipe(
  ofType(PACKAGES_AUTOCOMPLETE_QUERY),
  withLatestFrom(state$),
  switchMap(function([action, state])  {
    if (isValidAutocompleteQuery(action.payload)) {
      return from(queryNpm(action.payload))
        .pipe(switchMap((res: any[]) => {
          return of(updateFindingsAction(res));
        }));
    }

    return of(updateFindingsAction([]));
  })
);

export const resetQueryEpic = (action$, state$) => action$.pipe(
  ofType(PACKAGES_CANCEL_CONFIGURE),
  withLatestFrom(state$),
  switchMap(function([action, state])  {
    let actions: actionWithPayload<any>[] = [];

    actions.push(queryAction(''));
    actions.push(updateFindingsAction([]));

    return actions;
  })
);