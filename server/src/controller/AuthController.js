const { crawlName } = require("../utils/crawlData");

class AuthController {
  login = async (req, res) => {
    const { studentID } = req.body;
    if (!studentID) {
      return res.status(400).send({ message: "Yêu cầu mã sinh viên" });
    }

    const name = await crawlName(studentID);

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
