// eslint-disable-next-line import/prefer-default-export
export const filter = (targets, search) => (
  targets.filter((target) => (
    target.properties.name.includes(search)
    || target.properties.town.includes(search)
    || target.properties.type.includes(search)
    || target.properties.source.includes(search)
  ))
);
