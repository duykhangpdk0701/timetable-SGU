import { backgroundColor } from "../constants/backgroudColorGroup";

const getColor = (index) => {
  const length = backgroundColor.length;
  if (index >= length) {
    return backgroundColor[index % length];
  }
  return backgroundColor[index];
};

export default getColor;
