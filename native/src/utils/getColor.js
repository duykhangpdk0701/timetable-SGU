import { backGroundColor } from "../constants/backGroundColor";

const getColor = (index) => {
  const length = backGroundColor.length;
  if (index >= length) {
    return backGroundColor[index % length];
  }
  return backGroundColor[index];
};

export default getColor;
