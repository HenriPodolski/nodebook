import { ofType } from 'redux-observable';
import { switchMap, withLatestFrom } from 'rxjs/operators';
import { INIT, stateAction } from '../actions/init/init.actions';
import { stopAction } from '../actions/loading/loading.actions';
import { LoadingEnums } from '../enums/loading.enums';
import { PackageJsonService } from '../services/files/package-json.service';
import { newAction } from '../actions/input/inputs.actions';

export const initEpic = (action$, state$) => action$.pipe(
	ofType(INIT),
	withLatestFrom(state$),
	switchMap(() => {
		let actions: { type: string; payload?: any; }[] = [];
		console.log('initEpic');

		const initialInputs = PackageJsonService.loadNodebook();

		console.log(initialInputs);

		initialInputs.forEach((input) => {
			actions.push(newAction(input));
		});

		actions.push(stopAction(LoadingEnums.components.application));
		actions.push(stateAction());

		return actions;
	})
);