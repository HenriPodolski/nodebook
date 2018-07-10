import { ofType } from 'redux-observable';
import { map, withLatestFrom } from 'rxjs/internal/operators';
import { EDITOR_EXECUTE_FLAG_CHANGE } from '../actions/editor/editor.actions';
import { newAction, stateAction } from '../actions/editor/editors.actions';
import { environment } from '../environments/environment';
import { actionWithPayload } from '../actions';

export const newEditorEpic = (action$, state$) => action$.pipe(
    ofType(EDITOR_EXECUTE_FLAG_CHANGE),
    withLatestFrom(state$),
    map((action: actionWithPayload<string>) => {

        const unprocessed = state$.value.editors.filter(editor => editor.executeFlag !== 'processed');

        if (unprocessed.length === 0) {
            return newAction({...environment.config.editor.editableConfig});
        } else {
            return stateAction();
        }
    })
);