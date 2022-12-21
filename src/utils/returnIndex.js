const returnIndex = (index, divinedNumber) => {
  const number = divinedNumber / 8;
  return Math.floor(index / number);
};

const returnIndexToArray = (index, amountOfElement) => {
  return index % (amountOfElement / 8);
};

module.exports = { returnIndex, returnIndexToArray };
