const moment = require("moment");
const {
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  SATURDAY,
  SUNDAY,
  THURSDAY,
  FRIDAY,
} = require("../constants/dayOfWeek");
const { convertDateToValue } = require("../utils/convertDateToValue");
const { crawlData, crawlName } = require("../utils/crawlData");

class CrawlDataController {
  getData = async (req, res) => {
    const { id } = req.params;
    const newArray = await crawlData(id);
    return res.send({ timetable: newArray });
  };

  getName = async (req, res) => {
    const { id } = req.params;
    const name = await crawlName(id);
    return res.status(200).send({ name });
  };

  postDataByWeek = async (req, res) => {
    const { date } = req.body;
    const { id } = req.params;
    const crawlArray = await crawlData(id);
    const weekOfDay = moment(date).weekday();
    let newArrayDate = [];
    let resultArray = [];

    switch (weekOfDay) {
      case MONDAY.value:
        newArrayDate = [
          moment(date).subtract(1, "day"),
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
          moment(date).subtract(2, "day"),
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
          moment(date).subtract(3, "day"),
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
          moment(date).subtract(4, "day"),
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
          moment(date).subtract(5, "day"),
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
        newArrayDate = [
          moment(date),
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

    crawlArray.forEach((value, index) => {
      const temp = { ...value, scheduleArray: [] };
      const tempSchedule = value.scheduleArray;

      tempSchedule.forEach((scheduleValue, scheduleIndex) => {
        if (Object.keys(scheduleValue).length !== 0) {
          newArrayDate.forEach((dateValue, dateIndexValue) => {
            if (
              moment(moment(dateValue).format("YYYY-MM-DD")).isBetween(
                moment(scheduleValue.week.date.dateStart).format("YYYY-MM-DD"),
                moment(scheduleValue.week.date.dateEnd).format("YYYY-MM-DD"),
              ) &&
              convertDateToValue(scheduleValue.dow) ===
                moment(dateValue).weekday()
            ) {
              temp.scheduleArray.push(scheduleValue);
            }
          });
        }
      });

      if (temp.scheduleArray.length !== 0) {
        resultArray.push(temp);
      }
    });

    return res.status(200).send({ timetable: resultArray });
  };

  //! need to handle QP3 subject
  postDataByDay = async (req, res) => {
    const { id } = req.params;
    const getCrawlData = await crawlData(id);
    const { date } = req.body;
    if (!date) {
      return res.status(400).send({ error: "Missing params date" });
    }

    const formatDate = moment(date).format("YYYY-MM-DD");

    const result = getCrawlData

      .filter((value, index) => {
        for (const key of value.scheduleArray) {
          if (Object.keys(key).length !== 0) {
            const dateStart = moment(key.week.date.dateStart).format(
              "YYYY-MM-DD",
            );
            const dateEnd = moment(key.week.date.dateEnd).format("YYYY-MM-DD");
            const dayOfWeek = key.dow;

            if (
              moment(formatDate).isBetween(dateStart, dateEnd) &&
              convertDateToValue(dayOfWeek) === moment(formatDate).days()
            ) {
              return true;
            }
          }
        }
        return false;
      })
      .map((value, index) => {
        const scheduleArray = [];
        for (const item of value.scheduleArray) {
          const dayOfWeek = item.dow;
          if (convertDateToValue(dayOfWeek) === moment(formatDate).days()) {
            scheduleArray.push(item);
          }
        }
        return { ...value, scheduleArray };
      });

    return res.status(200).send({ timetable: result });
  };
}

module.exports = new CrawlDataController();
