export const isValidAutocompleteQuery = function(query) {
  return query && /\S/.test(query.trim())
};