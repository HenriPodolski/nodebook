import { ofType } from 'redux-observable';
import { withLatestFrom } from 'rxjs/operators';
import { PackageJsonService } from '../services/files/package-json.service';
import { stateAction, TITLE_UPDATE } from '../actions/title/title.actions';
import { isValidTitle } from '../helpers/title-validator.helpers';
import { map } from 'rxjs/internal/operators';

export const updateTitleEpic = (action$, state$) => action$.pipe(
  ofType(TITLE_UPDATE),
  withLatestFrom(state$),
  map(([action, state]) => {
    const isValid = isValidTitle(action.title);

    if (isValid) {
      PackageJsonService.updateTitle(action.title.trim());
    }

    return stateAction();
  })
);