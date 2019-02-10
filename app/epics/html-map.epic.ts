import { ofType } from 'redux-observable';
import { switchMap, withLatestFrom } from 'rxjs/operators';
import { HTML_MAP_START_EXTERNAL } from '../actions/html-map/html-map.actions';
import { ModeEnums } from '../enums/mode.enums';
import { IInput } from '../shared/interfaces/input.interface';
import { fromEvent, of } from 'rxjs';

export const startExternalMappingEpic = (action$, state$) => action$.pipe(
    ofType(HTML_MAP_START_EXTERNAL),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
        const index = action.payload.index;
        const win = action.payload.browserWindow;
        const htmlInputsValues = state.inputs
            .filter((input: IInput) => {
                return input.mode === ModeEnums.html.value &&
                    !!(input.value) &&
                    input.id !== index
            })
            .map((input: IInput) => input.value);
        const mapData = {
            type: 'htmlStringData',
            payload: {
                document: htmlInputsValues.join('\r\n')
            }
        };

        console.log('Put together event listener which builds the result', index);

        return fromEvent(window, 'message')
            .pipe(switchMap((evt: any) => {
                if (window.location.origin === evt.origin && evt.data === 'ready') {
                    win.postMessage(JSON.stringify(mapData), window.location.origin);
                }

                return of();
            }));
    })
);