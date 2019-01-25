import { actionWithPayload } from '../../actions';
import { IPackages } from '../../shared/interfaces/packages.interface';
import {
	PACKAGES_ADD_MESSAGE,
	PACKAGES_CANCEL_CONFIGURE,
	PACKAGES_CONFIGURE, PACKAGES_DISABLED,
	PACKAGES_REMOVE_MESSAGES,
	PACKAGES_STAGE_DEPENDENCY,
	PACKAGES_STAGE_DEV_DEPENDENCY,
	PACKAGES_UPDATE, PACKAGES_UPDATE_DEPENDENCIES, PACKAGES_UPDATE_DEV_DEPENDENCIES
} from '../../actions/packages/packages.actions';
import { rootState } from '../../store/state';

export function packagesReducer(
	state: IPackages = rootState.packages,
	action: actionWithPayload<
		IPackages |
		IPackages['dependencies'] |
		IPackages['devDependencies'] |
		boolean |
		string
	>
): IPackages {
	switch (action.type) {
		case PACKAGES_UPDATE: {
			return action.payload as IPackages;
		}
		case PACKAGES_DISABLED: {
			return {
				...state,
				disabled: action.payload as boolean
			};
		}
		case PACKAGES_UPDATE_DEPENDENCIES: {
			return {
				...state,
				dependencies: Object.assign({}, action.payload as IPackages['dependencies'])
			};
		}
		case PACKAGES_UPDATE_DEV_DEPENDENCIES: {
			return {
				...state,
				devDependencies: Object.assign({}, action.payload as IPackages['devDependencies'])
			};
		}
		case PACKAGES_STAGE_DEPENDENCY: {
			return {
				...state,
				stagedDependencies: [
					...state.stagedDependencies,
					action.payload as string
				]
			}
		}
		case PACKAGES_STAGE_DEV_DEPENDENCY: {
			return {
				...state,
				stagedDevDependencies: [
					...state.stagedDevDependencies,
					action.payload as string
				]
			}
		}
		case PACKAGES_ADD_MESSAGE: {
			return {
				...state,
				messages: [
					...state.messages,
					action.payload as string
				]
			};
		}
		case PACKAGES_REMOVE_MESSAGES: {
			return {
				...state,
				messages: []
			};
		}
		case PACKAGES_CONFIGURE: {
			return {
				...state,
				configure: true
			};
		}
		case PACKAGES_CANCEL_CONFIGURE: {
			return {
				...state,
				configure: false
			};
		}
		default:
			return state;
	}
}