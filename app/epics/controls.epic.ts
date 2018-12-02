import { ofType } from 'redux-observable';
import { withLatestFrom } from 'rxjs/operators';
import {
    CONTROLS_DELETE_ENTRY,
    CONTROLS_DELETE_ENTRY_INTENTION
} from '../actions/controls/delete.actions';
import { showModalDialogAction } from '../actions/controls/modal.actions';
import { concatMap, map } from 'rxjs/internal/operators';
import { ControlsEnums } from '../enums/controls.enums';
import { deleteAction as inputsDeleteAction } from '../actions/input/inputs.actions';
import { action } from '../actions';
import { deleteAction as outputsDeleteAction } from '../actions/output/outputs.actions';
import { PackageJsonService } from '../services/files/package-json.service';
import { SourceFilesService } from '../services/files/source-files.service';

export const deleteConfirmationEpic = (action$, state$) => action$.pipe(
    ofType(CONTROLS_DELETE_ENTRY_INTENTION),
    withLatestFrom(state$),
    map(([action, state]) => {
        return showModalDialogAction({
            label: 'Delete',
            id: action.index,
            type: ControlsEnums.modalDialogs.deleteEntryConfirm
        });
    })
);

export const deleteConfirmedEpic = (action$, state$) => action$.pipe(
    ofType(CONTROLS_DELETE_ENTRY),
    withLatestFrom(state$),
    concatMap(([action, state]) => {
        const actions: action[] = [];
        actions.push(inputsDeleteAction({id: action.index}));
        actions.push(outputsDeleteAction({id: action.index}));

        const deleteItem = state.outputs.find(output => {
            return output.id === action.index + 1;
        });

        if (deleteItem) {
            PackageJsonService.removeNodebookItem(deleteItem.id);
        }

        if (deleteItem && action.deleteFile) {
            console.log('deleteFile', deleteItem);
            SourceFilesService.removeFile(deleteItem.file);
        }

        return actions;
    })
);