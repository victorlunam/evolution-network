export const createFullName = (names: string, lastNames: string) => {
  return `${names} ${lastNames}`;
};

export const createShortName = (names: string, lastNames: string) => {
  const splitName = names.trim().split(" ");
  const splitLastName = lastNames.trim().split(" ");

  return `${splitName[0]} ${splitLastName[0]}`;
};
