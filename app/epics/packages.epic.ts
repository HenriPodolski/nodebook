import { ofType } from 'redux-observable';
import { withLatestFrom } from 'rxjs/operators';
import { switchMap } from 'rxjs/internal/operators';
import {
  PACKAGES_AUTOCOMPLETE_QUERY, queryAction,
  updateFindingsAction
} from '../actions/packages/packages-autocomplete.actions';
import { isValidAutocompleteQuery } from '../helpers/packages-autocomplete-validator.helper';
import { NpmService } from '../services/npm/npm.service';
import { from, of } from 'rxjs';
import {
    PACKAGES_CANCEL_CONFIGURE,
    PACKAGES_STAGE_DEPENDENCY,
    PACKAGES_STAGE_DEV_DEPENDENCY, stateAction
} from '../actions/packages/packages.actions';
import { actionWithPayload } from '../actions';

export const performInstallEpic = (action$, state$) => action$.pipe(
    ofType(PACKAGES_STAGE_DEPENDENCY, PACKAGES_STAGE_DEV_DEPENDENCY),
    withLatestFrom(state$),
    switchMap(function([action, state])  {
        console.log(action);
        return of(stateAction());
    })
);

export const performQueryEpic = (action$, state$) => action$.pipe(
  ofType(PACKAGES_AUTOCOMPLETE_QUERY),
  withLatestFrom(state$),
  switchMap(function([action, state])  {
    if (isValidAutocompleteQuery(action.payload)) {
      return from(NpmService.queryNpm(action.payload))
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