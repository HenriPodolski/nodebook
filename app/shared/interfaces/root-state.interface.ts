import { IInput } from './input.interface';
import { ILoading } from './loading.interface';
import { IModalDialog } from './modal-dialog.interface';

export interface IRootState {
	inputs: IInput[],
	outputs: any[],
    controls: {
        modalDialog: IModalDialog | null
    },
	debug: {
		components: string,
		store: string
	},
	loading: ILoading,
	init: boolean
}