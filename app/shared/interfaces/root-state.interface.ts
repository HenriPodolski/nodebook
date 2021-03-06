import { IInput } from './input.interface';
import { ILoading } from './loading.interface';
import { IModalDialog } from './modal-dialog.interface';
import { ITitle } from './title.interface';
import { IPackages, IPackagesAutocomplete } from './packages.interface';

export interface IRootState {
  packagesAutocomplete: IPackagesAutocomplete,
  packages: IPackages,
	title: ITitle,
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