import {ofType} from 'redux-observable';
import {withLatestFrom} from 'rxjs/operators';
import {switchMap} from 'rxjs/internal/operators';
import {
    PACKAGES_AUTOCOMPLETE_QUERY, queryAction,
    updateFindingsAction
} from '../actions/packages/packages-autocomplete.actions';
import {isValidAutocompleteQuery} from '../helpers/packages-autocomplete-validator.helper';
import {NpmService} from '../services/npm/npm.service';
import {from, of} from 'rxjs';
import {
    addMessageAction,
    PACKAGES_CANCEL_CONFIGURE,
    PACKAGES_READ_ALL_DEPENDENCIES, PACKAGES_REMOVE_DEPENDENCY, PACKAGES_REMOVE_DEV_DEPENDENCY,
    PACKAGES_STAGE_DEPENDENCY,
    PACKAGES_STAGE_DEV_DEPENDENCY, readAllDependenciesAction,
    updateDependenciesAction,
    updateDevDependenciesAction
} from '../actions/packages/packages.actions';
import {action, actionWithPayload} from '../actions';
import {startAction, stopAction} from '../actions/loading/loading.actions';
import {LoadingEnums} from '../enums/loading.enums';
import {PackageJsonService} from "../services/files/package-json.service";

export const removeDependencyEpic = (action$, state$) => action$.pipe(
    ofType(PACKAGES_REMOVE_DEPENDENCY, PACKAGES_REMOVE_DEV_DEPENDENCY),
    withLatestFrom(state$),
    switchMap(function ([action]) {
        const isDev = action.type === PACKAGES_REMOVE_DEV_DEPENDENCY;
        let actions: Array<actionWithPayload<any> | action> = [];

        console.log(action);

        return NpmService.uninstallNpmPackage(
            action.payload, isDev
        ).pipe(switchMap((out: { stderror?: string, stdout?: string }) => {
            let messages: string[] = [];
            if (out.stdout) {
                messages = out.stdout.split('\n');
            } else if (out.stderror) {
                messages = out.stderror.split('\n');
            }

            if (messages.length) {
                actions = messages.reduce((prev, next) => {
                    if (next) {
                        prev.push(addMessageAction(next));
                    }

                    return prev;
                }, [] as Array<actionWithPayload<any> | action>);
            }

            actions.push(readAllDependenciesAction());

            return actions;
        }));
    })
);

export const mirrorDependenciesToStoreEpic = (action$, state$) => action$.pipe(
    ofType(PACKAGES_READ_ALL_DEPENDENCIES),
    withLatestFrom(state$),
    switchMap(function () {
        let actions: Array<actionWithPayload<any> | action> = [];
        const packageJson = PackageJsonService.readPackageJson();
        // todo use watcher to add data, because it takes some time until everything is there
        // todo remove file watcher if everything is done
        actions.push(updateDependenciesAction(packageJson.dependencies));
        actions.push(updateDevDependenciesAction(packageJson.devDependencies));
        return actions;
    })
);

export const startInstallLoaderEpic = (action$, state$) => action$.pipe(
    ofType(PACKAGES_STAGE_DEPENDENCY, PACKAGES_STAGE_DEV_DEPENDENCY),
    withLatestFrom(state$),
    switchMap(function () {
        return of(startAction(LoadingEnums.components.userinterface));
    })
);

export const performInstallEpic = (action$, state$) => action$.pipe(
    ofType(PACKAGES_STAGE_DEPENDENCY, PACKAGES_STAGE_DEV_DEPENDENCY),
    withLatestFrom(state$),
    switchMap(function ([action]) {
        const isDev = action.type === PACKAGES_STAGE_DEV_DEPENDENCY;
        let actions: Array<actionWithPayload<any> | action> = [];

        return NpmService.installNpmPackage(action.payload, isDev)
            .pipe(switchMap((out: { stderror?: string, stdout?: string }) => {
                let messages: string[] = [];
                if (out.stdout) {
                    messages = out.stdout.split('\n');
                } else if (out.stderror) {
                    messages = out.stderror.split('\n');
                }

                if (messages.length) {
                    actions = messages.reduce((prev, next) => {
                        if (next) {
                            prev.push(addMessageAction(next));
                        }

                        return prev;
                    }, [] as Array<actionWithPayload<any> | action>);

                    if (messages[0].match(/^\+ .+/)) {
                        actions.push(stopAction(LoadingEnums.components.userinterface));
                    }
                }

                return actions;
            }));
    })
);

export const performQueryEpic = (action$, state$) => action$.pipe(
    ofType(PACKAGES_AUTOCOMPLETE_QUERY),
    withLatestFrom(state$),
    switchMap(function ([action, state]) {
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
    switchMap(function ([action, state]) {
        let actions: actionWithPayload<any>[] = [];

        actions.push(queryAction(''));
        actions.push(updateFindingsAction([]));

        return actions;
    })
);