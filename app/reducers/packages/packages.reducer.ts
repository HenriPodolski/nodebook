import { actionWithPayload } from '../../actions';
import { IPackages } from '../../shared/interfaces/packages.interface';
import {
  PACKAGES_ADD_DEPENDENCY, PACKAGES_ADD_DEV_DEPENDENCY,
  PACKAGES_CANCEL_CONFIGURE,
  PACKAGES_CONFIGURE, PACKAGES_REMOVE_DEPENDENCY, PACKAGES_REMOVE_DEV_DEPENDENCY,
  PACKAGES_UPDATE,
  PACKAGES_UPDATE_DEPENDENCY, PACKAGES_UPDATE_DEV_DEPENDENCY
} from '../../actions/packages/packages.actions';

export function packagesReducer(
	state: IPackages = {dependencies: {}, devDependencies: {}, configure: false},
	action: actionWithPayload<IPackages | boolean | {[key: string]: string}>
): IPackages {
	switch (action.type) {
		case PACKAGES_UPDATE: {
			return action.payload as IPackages;
		}
    case PACKAGES_UPDATE_DEPENDENCY:
    case PACKAGES_ADD_DEPENDENCY: {
      return {
				...state,
				dependencies: {
					...state.dependencies,
          [Object.keys(action.payload)[0]]: action.payload[Object.keys(action.payload)[0]]
				}
      }
    }
    case PACKAGES_REMOVE_DEPENDENCY: {
      const { [Object.keys(action.payload)[0]]: value, ...withoutRemoved } = state.dependencies;

      return {
        ...state,
        dependencies: {
          ...withoutRemoved
        }
      };
    }
    case PACKAGES_UPDATE_DEV_DEPENDENCY:
    case PACKAGES_ADD_DEV_DEPENDENCY: {
      return {
        ...state,
        devDependencies: {
          ...state.devDependencies,
          [Object.keys(action.payload)[0]]: action.payload[Object.keys(action.payload)[0]]
        }
      }
    }
    case PACKAGES_REMOVE_DEV_DEPENDENCY: {
      const { [Object.keys(action.payload)[0]]: value, ...withoutRemoved } = state.devDependencies;

      return {
        ...state,
        devDependencies: {
          ...withoutRemoved
        }
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