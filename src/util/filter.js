/* eslint-disable max-len */
// eslint-disable-next-line import/prefer-default-export
export const filter = (targets, search, searchLimit) => {
  if (!searchLimit.name && !searchLimit.location && !searchLimit.type && !searchLimit.source) {
    return targets.filter((target) => (
      target.properties.name.toLowerCase().includes(search.toLowerCase())
      || target.properties.town.toLowerCase().includes(search.toLowerCase())
      || target.properties.type.toLowerCase().includes(search.toLowerCase())
      || target.properties.source.toLowerCase().includes(search.toLowerCase())
    ));
  }
  return targets.filter((target) => (
    (searchLimit.name && target.properties.name.toLowerCase().includes(search.toLowerCase()))
    || (searchLimit.location && target.properties.town.toLowerCase().includes(search.toLowerCase()))
    || (searchLimit.type && target.properties.type.toLowerCase().includes(search.toLowerCase()))
    || (searchLimit.source && target.properties.source.toLowerCase().includes(search.toLowerCase()))
  ));
};
