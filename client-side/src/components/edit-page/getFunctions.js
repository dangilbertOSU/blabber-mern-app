export const getPosition = (string) => {
  let start = string.indexOf('translate(') + 10;
  let end = string.indexOf(');');

  let position = string.substring(start, end);
  position = position.split('px').join('');
  let positionArr = position.split(', ');
  positionArr[0] = Number(positionArr[0]);
  if (positionArr[1]) positionArr[1] = Number(positionArr[1]);
  else positionArr[1] = 0;

  return positionArr;
};

export const getHeight = (string) => {
  return Number(string.replace('px', ''));
};

export const getWidth = (string) => {
  return Number(string.replace('px', ''));
};
