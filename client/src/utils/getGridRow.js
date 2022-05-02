export const getGridRowBegin = (subjectStart) => {
  const subjectStartInteger = parseInt(subjectStart);
  let result = subjectStartInteger;

  if (subjectStartInteger >= 3) {
    result++;
  }

  if (subjectStartInteger >= 6) {
    result++;
  }

  if (subjectStartInteger >= 8) {
    result++;
  }
  if (subjectStartInteger >= 11) {
    result++;
  }

  return result;
};

export const getGridRowEnd = (subjectStart, amountOfSubject) => {
  const subjectStartInteger = parseInt(subjectStart);
  const amountOfSubjectInteger = parseInt(amountOfSubject);
  let result = subjectStartInteger + amountOfSubjectInteger;

  if (subjectStartInteger + amountOfSubjectInteger >= 4) {
    result++;
  }

  if (subjectStartInteger + amountOfSubjectInteger >= 7) {
    result++;
  }

  if (subjectStartInteger + amountOfSubjectInteger >= 9) {
    result++;
  }
  if (subjectStartInteger + amountOfSubjectInteger >= 12) {
    result++;
  }

  return result;
};
