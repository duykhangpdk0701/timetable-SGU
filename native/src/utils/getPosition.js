import {
  FRIDAY,
  MONDAY,
  SATURDAY,
  SUNDAY,
  THURSDAY,
  TUESDAY,
  WEDNESDAY,
} from "../constants/daysOfWeek";

export const getLatitude = (subjectStart) => {
  const subjectStartInteger = parseInt(subjectStart);
  let result = (subjectStartInteger - 1) * 50;

  if (subjectStartInteger > 3) {
    result += 20;
  }

  if (subjectStartInteger >= 6) {
    result += 90;
  }

  if (subjectStartInteger >= 8) {
    result += 20;
  }

  if (subjectStartInteger >= 11) {
    result += 10;
  }

  return result;
};

export const getHeight = (amountOfSubject) => {
  let amountOfSubjectInteger = parseInt(amountOfSubject);
  return amountOfSubjectInteger * 50;
};

export const getLongitude = (valueVn) => {
  switch (valueVn) {
    case MONDAY.valueVn:
      return (MONDAY.value - 1) * 250;
    case TUESDAY.valueVn:
      return (TUESDAY.value - 1) * 250;
    case WEDNESDAY.valueVn:
      return (WEDNESDAY.value - 1) * 250;
    case THURSDAY.valueVn:
      return (THURSDAY.value - 1) * 250;
    case FRIDAY.valueVn:
      return (FRIDAY.value - 1) * 250;
    case SATURDAY.valueVn:
      return (SATURDAY.value - 1) * 250;
    case SUNDAY.valueVn:
      return (SUNDAY.value - 1) * 250;

    default:
      return null;
  }
};
