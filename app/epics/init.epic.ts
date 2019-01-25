import { ofType } from 'redux-observable';
import { switchMap, withLatestFrom } from 'rxjs/operators';
import { INIT } from '../actions/init/init.actions';
import { stopAction } from '../actions/loading/loading.actions';
import { LoadingEnums } from '../enums/loading.enums';
import { PackageJsonService } from '../services/files/package-json.service';
import { executeFlagChangeAction, newAction } from '../actions/input/inputs.actions';
import { InputEnums } from '../enums/input.enums';
import { IInput } from '../shared/interfaces/input.interface';
import { updateAction } from '../actions/title/title.actions';
import {addMessageAction, disabledAction, readAllDependenciesAction} from "../actions/packages/packages.actions";
import {NpmService} from "../services/npm/npm.service";

export const initEpic = (action$, state$) => action$.pipe(
	ofType(INIT),
	withLatestFrom(state$),
	switchMap(() => {
		let actions: { type: string; payload?: any; }[] = [];
		console.log('initEpic');

		const initialInputs = PackageJsonService.loadNodebook();

		initialInputs.forEach((input: IInput, index: number) => {

			actions.push(newAction(input));

			if (index < (initialInputs.length - 1)) {
				actions.push(executeFlagChangeAction(InputEnums.executeFlags.processing, index));
			}
		});

		const initialTitle = PackageJsonService.getTitle();

		actions.push(updateAction(initialTitle));
		actions.push(readAllDependenciesAction());
		actions.push(stopAction(LoadingEnums.components.application));
		// actions.push(stateAction());

		return actions;
	})
);

export const checkNpmInstallationEpic = (action$, state$) => action$.pipe(
	ofType(INIT),
	withLatestFrom(state$),
	switchMap(() => {
		return NpmService.checkNpmInstallation();
	}),
	switchMap(({stderror, stdout}: {stderror?: string, stdout?: string}) => {
		let actions: { type: string; payload?: any; }[] = [];
		if (stderror) {
			actions.push(disabledAction(true));
			actions.push(addMessageAction(
				`npm is not available. Please install <a href="https://nodejs.org/en/download" target="_blank">node and npm</a> 
				 or add npm to your path.`
			));
		}

		return actions;
	})
);