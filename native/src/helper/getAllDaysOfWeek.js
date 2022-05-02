import moment from "moment";
import {
  FRIDAY,
  MONDAY,
  SATURDAY,
  SUNDAY,
  THURSDAY,
  TUESDAY,
  WEDNESDAY,
} from "../constants/daysOfWeek";

const getAllDayOfWeek = (date) => {
  const weekDay = moment(date).weekday();
  let newArrayDate = [];

  switch (weekDay) {
    case MONDAY.value:
      newArrayDate = [
        moment(date),
        moment(date).add(1, "day"),
        moment(date).add(2, "day"),
        moment(date).add(3, "day"),
        moment(date).add(4, "day"),
        moment(date).add(5, "day"),
      ];
      break;

    case TUESDAY.value:
      newArrayDate = [
        moment(date).subtract(1, "day"),
        moment(date),
        moment(date).add(1, "day"),
        moment(date).add(2, "day"),
        moment(date).add(3, "day"),
        moment(date).add(4, "day"),
      ];
      break;
    case WEDNESDAY.value:
      newArrayDate = [
        moment(date).subtract(2, "day"),
        moment(date).subtract(1, "day"),
        moment(date),
        moment(date).add(1, "day"),
        moment(date).add(2, "day"),
        moment(date).add(3, "day"),
      ];
      break;

    case THURSDAY.value:
      newArrayDate = [
        moment(date).subtract(3, "day"),
        moment(date).subtract(2, "day"),
        moment(date).subtract(1, "day"),
        moment(date),
        moment(date).add(1, "day"),
        moment(date).add(2, "day"),
      ];
      break;
    case FRIDAY.value:
      newArrayDate = [
        moment(date).subtract(4, "day"),
        moment(date).subtract(3, "day"),
        moment(date).subtract(2, "day"),
        moment(date).subtract(1, "day"),
        moment(date),
        moment(date).add(1, "day"),
      ];
      break;

    case SATURDAY.value:
      newArrayDate = [
        moment(date).subtract(5, "day"),
        moment(date).subtract(4, "day"),
        moment(date).subtract(3, "day"),
        moment(date).subtract(2, "day"),
        moment(date).subtract(1, "day"),
        moment(date),
      ];
      break;

    case SUNDAY.value:
      newArrayDate = [
        moment(date).add(1, "day"),
        moment(date).add(2, "day"),
        moment(date).add(3, "day"),
        moment(date).add(4, "day"),
        moment(date).add(5, "day"),
        moment(date).add(6, "day"),
      ];

    default:
      break;
  }

  return newArrayDate.map((value, index) => {
    switch (index) {
      case MONDAY.value - 1:
        return { ...value, name: "Thứ 2" };
      case TUESDAY.value - 1:
        return { ...value, name: "Thứ 3" };
      case WEDNESDAY.value - 1:
        return { ...value, name: "Thứ 4" };
      case THURSDAY.value - 1:
        return { ...value, name: "Thứ 5" };
      case FRIDAY.value - 1:
        return { ...value, name: "Thứ 6" };
      case SATURDAY.value - 1:
        return { ...value, name: "Thứ 7" };

      default:
        return { ...value, name: "" };
    }
  });
};

export default getAllDayOfWeek;
