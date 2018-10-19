import { IInput } from './input.interface';
import { ILoading } from './loading.interface';

export interface IRootState {
	inputs: IInput[],
	outputs: any[],
	debug: {
		components: string,
		store: string
	},
	loading: ILoading
}