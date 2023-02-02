const puppeteer = require("puppeteer");
const { crawlName } = require("../utils/crawlData");

class AuthController {
  login = async (req, res) => {
    const { studentID, password } = req.body;
    if (!studentID) {
      return res.status(400).send({ message: "Yêu cầu mã sinh viên" });
    }

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(process.env.URL_CRAWL);

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

    if (studentID.length !== 10) {
      return res.status(400).send({ message: "Mã sinh viên không hợp lệ" });
    }

    if (!name) {
      return res.status(400).send({ message: "Không tìm thấy mã sinh viên" });
    }

    return res.status(200).send({ name: name, studentID });
  };
}

module.exports = new AuthController();
