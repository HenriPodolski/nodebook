import { ofType } from 'redux-observable';
import { switchMap, withLatestFrom } from 'rxjs/operators';
import { CONTROLS_DELETE_ENTRY_INTENTION } from '../actions/controls/delete.actions';

export const deleteConfirmationEpic = (action$, state$) => action$.pipe(
    ofType(CONTROLS_DELETE_ENTRY_INTENTION),
    withLatestFrom(state$),
    switchMap(([action, state]) => {

    })
);