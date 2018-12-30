import { environment } from '../../environments/environment';
import { ITitle } from '../../shared/interfaces/title.interface';
import { TITLE_CANCEL_EDIT, TITLE_EDIT, TITLE_UPDATE } from '../../actions/title/title.actions';
import { isValidTitle } from '../../helpers/title-validator.helpers';

export function titleReducer(
  state: ITitle = {
    text: environment.config.package.nodebook.title,
    valid: false,
    edit: true
  },
  action: any
): ITitle {
  switch (action.type) {
    case TITLE_UPDATE: {
      const isValid = isValidTitle(action.title);

      return {
        text: action.title.trim(),
        edit: false,
        valid: isValid
      };
    }
    case TITLE_EDIT: {
      return {
        text: state.text,
        edit: true,
        valid: state.valid
      }
    }
    case TITLE_CANCEL_EDIT: {
      return {
        text: state.text,
        edit: false,
        valid: state.valid
      }
    }
    default:
      return state;
  }
}