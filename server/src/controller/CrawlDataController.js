const moment = require("moment");
const puppeteer = require("puppeteer");
const { convertDateToValue } = require("../utils/convertDateToValue");
const { crawlData, crawlName } = require("../utils/crawlData");
const returnWeek = require("../utils/returnWeek");

class CrawlDataController {
  getData = async (req, res) => {
    const { id } = req.params;
    const newArray = await crawlData(id);
    return res.send({ timetable: newArray });
  };

  getName = async (req, res) => {
    const { studentID, password } = req.body;
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(
      "http://thongtindaotao.sgu.edu.vn/default.aspx?page=dangnhap"
    );

    await page.type("#ctl00_ContentPlaceHolder1_ctl00_txtTaiKhoa", studentID);

    await page.type("#ctl00_ContentPlaceHolder1_ctl00_txtMatKhau", password);
    //

    const submitButtonSelector = "#ctl00_ContentPlaceHolder1_ctl00_btnDangNhap";
    await page.waitForSelector(submitButtonSelector);
    await page.click(submitButtonSelector);

    const allResultsSelector = "#ctl00_menu_xemdiemthi .center a";
    await page.waitForSelector(allResultsSelector);
    await page.click(allResultsSelector);

    const content = await page.content();
    const name = await crawlName(content);
    await browser.close();
    return res.status(200).send({ name });
  };

  //! need to handle QP3 subject
  postDataByDay = async (req, res) => {
    const { studentID, password, date } = req.body;
    if (!date) {
      return res.status(200).send({ message: "vui lòng nhập ngày tháng năm" });
    }
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(
      "http://thongtindaotao.sgu.edu.vn/default.aspx?page=dangnhap"
    );

    await page.type("#ctl00_ContentPlaceHolder1_ctl00_txtTaiKhoa", studentID);

    await page.type("#ctl00_ContentPlaceHolder1_ctl00_txtMatKhau", password);
    //

    const submitButtonSelector = "#ctl00_ContentPlaceHolder1_ctl00_btnDangNhap";
    await page.waitForSelector(submitButtonSelector);
    await page.click(submitButtonSelector);

    const allResultsSelector = "#ctl00_menu_thoikhoabieu .center a";
    await page.waitForSelector(allResultsSelector);
    await page.click(allResultsSelector);

    const content = await page.content();

    const getCrawlData = await crawlData(content);

    const formatDate = moment(date).format("YYYY-MM-DD");

    const result = getCrawlData

      .filter((value, index) => {
        for (const key of value.scheduleArray) {
          if (Object.keys(key).length !== 0) {
            const dateStart = moment(key.week.date.dateStart).format(
              "YYYY-MM-DD"
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
    await browser.close();
    return res.status(200).send({ timetable: result });
  };

  postDataByWeek = async (req, res) => {
    const { studentID, password, date } = req.body;
    if (!date) {
      return res.status(400).send({ message: "Vui long nhập ngày tháng năm" });
    }
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(
      "http://thongtindaotao.sgu.edu.vn/default.aspx?page=dangnhap"
    );

    await page.type("#ctl00_ContentPlaceHolder1_ctl00_txtTaiKhoa", studentID);

    await page.type("#ctl00_ContentPlaceHolder1_ctl00_txtMatKhau", password);
    //

    const submitButtonSelector = "#ctl00_ContentPlaceHolder1_ctl00_btnDangNhap";
    await page.waitForSelector(submitButtonSelector);
    await page.click(submitButtonSelector);

    const allResultsSelector = "#ctl00_menu_thoikhoabieu .center a";
    await page.waitForSelector(allResultsSelector);
    await page.click(allResultsSelector);

    const content = await page.content();
    const crawlArray = await crawlData(content);
    console.log(crawlArray);
    const dateReq = moment(date);
    const weekOfDay = moment(date).weekday();
    let newArrayDate = returnWeek(weekOfDay, date);

    console.log(newArrayDate);
    let resultArray = [];

    crawlArray.forEach((value, index) => {
      const temp = { ...value, scheduleArray: [] };
      const tempSchedule = value.scheduleArray;

      tempSchedule.forEach((scheduleValue, scheduleIndex) => {
        if (Object.keys(scheduleValue).length !== 0) {
          newArrayDate.forEach((dateValue, dateIndexValue) => {
            if (
              moment(moment(dateValue).format("YYYY-MM-DD")).isBetween(
                moment(scheduleValue.week.date.dateStart).format("YYYY-MM-DD"),
                moment(scheduleValue.week.date.dateEnd).format("YYYY-MM-DD")
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

    await browser.close();

    return res.status(200).send({ timetable: resultArray });
  };
}

module.exports = new CrawlDataController();
