const {
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
  SUNDAY,
} = require("../constants/dayOfWeek");
const moment = require("moment");

const returnWeek = (weekOfDay, date) => {
  switch (weekOfDay) {
    case MONDAY.value:
      return [
        moment(date).subtract(1, "day"),
        moment(date),
        moment(date).add(1, "day"),
        moment(date).add(2, "day"),
        moment(date).add(3, "day"),
        moment(date).add(4, "day"),
        moment(date).add(5, "day"),
      ];
    case TUESDAY.value:
      return [
        moment(date).subtract(2, "day"),
        moment(date).subtract(1, "day"),
        moment(date),
        moment(date).add(1, "day"),
        moment(date).add(2, "day"),
        moment(date).add(3, "day"),
        moment(date).add(4, "day"),
      ];
    case WEDNESDAY.value:
      return [
        moment(date).subtract(3, "day"),
        moment(date).subtract(2, "day"),
        moment(date).subtract(1, "day"),
        moment(date),
        moment(date).add(1, "day"),
        moment(date).add(2, "day"),
        moment(date).add(3, "day"),
      ];

    case THURSDAY.value:
      return [
        moment(date).subtract(4, "day"),
        moment(date).subtract(3, "day"),
        moment(date).subtract(2, "day"),
        moment(date).subtract(1, "day"),
        moment(date),
        moment(date).add(1, "day"),
        moment(date).add(2, "day"),
      ];
    case FRIDAY.value:
      return [
        moment(date).subtract(5, "day"),
        moment(date).subtract(4, "day"),
        moment(date).subtract(3, "day"),
        moment(date).subtract(2, "day"),
        moment(date).subtract(1, "day"),
        moment(date),
        moment(date).add(1, "day"),
      ];

    case SATURDAY.value:
      return [
        moment(date).subtract(6, "day"),
        moment(date).subtract(5, "day"),
        moment(date).subtract(4, "day"),
        moment(date).subtract(3, "day"),
        moment(date).subtract(2, "day"),
        moment(date).subtract(1, "day"),
        moment(date),
      ];
      break;

    case SUNDAY.value:
      return [
        moment(date),
        moment(date).add(1, "day"),
        moment(date).add(2, "day"),
        moment(date).add(3, "day"),
        moment(date).add(4, "day"),
        moment(date).add(5, "day"),
        moment(date).add(6, "day"),
      ];
    default:
      return [];
  }
};

module.exports = returnWeek;
