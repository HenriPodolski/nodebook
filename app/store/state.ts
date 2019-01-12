import { environment } from '../environments/environment';
import { IRootState } from '../shared/interfaces/root-state.interface';
import { SupportEnums } from '../enums/support.enums';

export const rootState: IRootState = {
  packagesAutocomplete: {
    query: '',
    selected: null,
    found: []
  },
  packages: {
    dependencies: {},
    stagedDependencies: [],
    devDependencies: {},
    stagedDevDependencies: [],
    configure: false
  },
  title: {
    text: environment.config.package.nodebook.title,
    valid: false,
    edit: true
  },
  debug: {
    components: SupportEnums.logLevel.off,
    store: SupportEnums.logLevel.off
  },
  controls: {
    modalDialog: null
  },
  inputs: [],
  outputs: [],
  loading: {
    ...environment.config.loading
  },
  init: false
};