import moment from "moment";

export const convertDayToWeekDay = (date) => {
  const value = moment(date).day();

  switch (value) {
    case 0:
      return "Chủ nhật";
    case 1:
      return "Thứ 2";
    case 2:
      return "Thứ 3";
    case 3:
      return "Thứ 4";
    case 4:
      return "Thứ 5";
    case 5:
      return "Thứ 6";
    case 6:
      return "Thứ 7";

    default:
      return null;
  }
};
