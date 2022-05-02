const moment = require("moment");

export const start = moment("07:00", "hh:mm");

export const convertAmountOfTimeToSpecificTime = (
  subjectStart,
  amountOfSubject,
) => {
  const subjectStartInteger = parseInt(subjectStart) - 1;
  const amountOfSubjectInteger = parseInt(amountOfSubject);
  const timeStart = moment(start).add(subjectStartInteger * 50, "m");

  const timeEnd = moment(start).add(
    (subjectStartInteger + amountOfSubjectInteger) * 50,
    "m",
  );

  if (subjectStartInteger + 1 >= 3) {
    timeStart.add(20, "m");
  }

  if (subjectStartInteger + 1 >= 6) {
    timeStart.add(90, "m");
  }

  if (subjectStartInteger + 1 >= 8) {
    timeStart.add(20, "m");
  }

  if (subjectStartInteger + amountOfSubjectInteger >= 3) {
    timeEnd.add(20, "m");
  }

  if (subjectStartInteger + amountOfSubjectInteger >= 6) {
    timeEnd.add(90, "m");
  }

  if (subjectStartInteger + amountOfSubjectInteger >= 8) {
    timeEnd.add(20, "m");
  }

  return {
    timeStart: moment(timeStart).format("hh:mm"),
    timeEnd: moment(timeEnd).format("hh:mm"),
  };
};
