const {
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
  SUNDAY,
} = require("../constants/dayOfWeek");

const convertDateToValue = (valueVn) => {
  switch (valueVn) {
    case MONDAY.valueVn:
      return MONDAY.value;
    case TUESDAY.valueVn:
      return TUESDAY.value;
    case WEDNESDAY.valueVn:
      return WEDNESDAY.value;
    case THURSDAY.valueVn:
      return THURSDAY.value;
    case FRIDAY.valueVn:
      return FRIDAY.value;
    case SATURDAY.valueVn:
      return SATURDAY.value;
    case SUNDAY.valueVn:
      return SUNDAY.value;

    default:
      return null;
  }
};

module.exports = { convertDateToValue };
