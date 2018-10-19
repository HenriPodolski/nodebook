import { actionWithPayload } from '../../actions';
import { ILoading } from '../../shared/interfaces/loading.interface';
import { environment } from '../../environments/environment';
import { LOADING_START, LOADING_STOP, LOADING_UPDATE } from '../../actions/loading/loading.actions';

export function loadingReducer(
	state: ILoading = { ...environment.config.loading },
	action: actionWithPayload<ILoading | string>
): ILoading {
	switch (action.type) {
		case LOADING_UPDATE: {
			return {
				...state,
				...action.payload as ILoading
			}
		}

		case LOADING_START: {
			if (state[action.payload as string]) {
				return Object.assign(
					{},
					state,
					{[action.payload as string]: true}
				);
			}

			return state;
		}

		case LOADING_STOP: {
			if (state[action.payload as string]) {
				return Object.assign(
					{},
					state,
					{[action.payload as string]: false}
				);
			}

			return state;
		}

		default:
			return state;
	}
}