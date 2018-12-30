import { environment } from '../environments/environment';

export const isValidTitle = function(title) {
  return title &&
  title !== environment.config.package.nodebook.title &&
  title.length > 0 &&
  /\S/.test(title.trim());
};