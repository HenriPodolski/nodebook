import { ofType } from 'redux-observable';
import { switchMap, withLatestFrom } from 'rxjs/internal/operators';
import {
    INPUT_EXECUTE_FLAG_CHANGE
} from '../actions/input/input.actions';
import { updateAction } from '../actions/output/outputs.actions';
import {
    executeFlagChangeAction,
    INPUTS_EXECUTE_FLAG_CHANGE,
    validationErrorsChangeAction
} from '../actions/input/inputs.actions';
import { process } from '../services/processors/processor.service';
import { InputEnums } from '../enums/input.enums';
import { OutputEnums } from '../enums/output.enums';

export const newOutputEpic = (action$, state$) => action$.pipe(
    ofType(INPUT_EXECUTE_FLAG_CHANGE, INPUTS_EXECUTE_FLAG_CHANGE),
    withLatestFrom(state$),
    switchMap(([action, state]) => {

        let processed: any[] = [];
        let actions: { type: string; payload: any; }[] = [];

        state.inputs.forEach((input, index) => {
            let validationErrors: {message: string}[] = [];
            const isFlagged = input.executeFlag === InputEnums.executeFlags.processing;
            /* tslint:disable */
            const isValidFilename = /^(?!\.)(?!com[0-9]$)(?!con$)(?!lpt[0-9]$)(?!nul$)(?!prn$)[^\|\*\?\\:<>/$"]*[^\.\|\*\?\\:<>/$"]+$/
                .test(input.name);
            /* tslint:enable */
            const isUnique = !(state
                .inputs
                .filter(filteredInput => {
                    return filteredInput.id !== input.id &&
                        filteredInput.name === input.name
                })
                .length);
            const isValidName = isValidFilename && isUnique;

            console.group('newOutputEpic ' + input.id + ': ' + input.name);
            console.log(action);
            console.log(state);
            console.log('isValidFilename ', isValidFilename);
            console.log('isUnique ', isUnique);
            console.groupEnd();

            if (!isValidFilename && isFlagged) {
                console.log('filename not valid');
                validationErrors.push({message: 'filename not valid'});
            }

            if (isValidFilename && !isUnique && isFlagged) {
                console.log('filename not unique');
                validationErrors.push({message: 'filename not unique'});
            }

            if (validationErrors.length) {
                actions.push(validationErrorsChangeAction({
                    filename: validationErrors
                }, index));

                actions.push(executeFlagChangeAction(InputEnums.executeFlags.idle, index));
            }

            if (isFlagged && isValidName) {

                actions.push(validationErrorsChangeAction({
                    filename: []
                }, index));

                actions.push(executeFlagChangeAction(InputEnums.executeFlags.processed, index));

                const logs = process(input);

                processed.push({
                    id: input.id,
                    name: input.name,
                    mode: input.mode,
                    value: input.value,
                    executeFlag: OutputEnums.executeFlags.processed,
                    logs
                });
            }
        });

        actions.push(updateAction(processed));

        return actions;
    })
);