const cheerio = require("cheerio");
const { returnIndex, returnIndexToArray } = require("../utils/returnIndex");
const moment = require("moment");

const crawlName = async (content) => {
  let name = "";
  const $ = cheerio.load(content);
  name = $(
    "#ctl00_ContentPlaceHolder1_ctl00_ucThongTinSV_lblTenSinhVien"
  ).text();
  const takeName = name.split("-");
  name = takeName[0].trim();

  return name;
};

const crawlData = async (content) => {
  const newArray = [];
  let storeDivinedNumber = 8;
  const $ = await cheerio.load(content);
  const temp = $(".grid-roll2").text();
  console.log(temp);

  $(".grid-roll2 .body-table tbody tr").each((index, el) => {
    let childArray = { scheduleArray: [] };
    let tempObject = {};
    $(el)
      .find("td")
      .each((index, el) => {
        const subject = $(el).text();
        console.log(subject);
        if (subject !== "") {
          switch (index) {
            case 0:
              childArray = { ...childArray, code: subject };
              break;
            case 1:
              childArray = { ...childArray, name: subject };
              break;
            case 2:
              childArray = { ...childArray, nmy: subject };
              break;
            case 3:
              childArray = { ...childArray, stc: subject };
              break;
            case 4:
              childArray = { ...childArray, codeClass: subject };
              break;
            case 5:
              childArray = { ...childArray, stchp: subject };
              break;
            default:
              break;
          }
        }
      });

    //take schedule
    const divinedNumber = $(el).find("td table").length;
    storeDivinedNumber =
      divinedNumber !== 0 ? divinedNumber : storeDivinedNumber;

    let tempArray = [];

    $(el)
      .find("td table tbody tr td")
      .each((index, el) => {
        const subject = $(el).text();

        const tempIndex = returnIndexToArray(index, storeDivinedNumber);

        switch (returnIndex(index, storeDivinedNumber)) {
          case 0:
            tempArray[tempIndex] = {
              ...tempArray[tempIndex],
              th: subject,
            };
            break;
          case 1:
            tempArray[tempIndex] = {
              ...tempArray[tempIndex],
              dow: subject,
            };
            break;
          case 2:
            tempArray[tempIndex] = {
              ...tempArray[tempIndex],
              subjectStart: subject,
            };
            break;
          case 3:
            tempArray[tempIndex] = {
              ...tempArray[tempIndex],
              amountOfSubject: subject,
            };
            break;
          case 4:
            tempArray[tempIndex] = {
              ...tempArray[tempIndex],
              room: subject,
            };

            break;
          case 5:
            tempArray[tempIndex] = {
              ...tempArray[tempIndex],
              CBGD: subject,
            };
            break;
          case 6:
            const timeStamp = $(el)
              .attr("onmouseover")
              .slice(15, 37)
              .split("--");

            tempArray[tempIndex] = {
              ...tempArray[tempIndex],
              week: {
                number: subject,
                date: {
                  dateStart: moment(timeStamp[0], "DD--MM--YYYY"),
                  dateEnd: moment(timeStamp[1], "DD--MM--YYYY"),
                },
              },
            };

            break;
          case 7:
            tempArray[tempIndex] = {
              ...tempArray[tempIndex],
              dssv: subject,
            };
            break;
          default:
            break;
        }
      });

    childArray.scheduleArray = [...childArray.scheduleArray, ...tempArray];

    tempObject = {};
    $(el)
      .find("td div")
      .each((index, el) => {
        const subject = $(el).text();
        switch (index) {
          case 0:
            tempObject = { ...tempObject, th: subject };
            break;
          case 1:
            tempObject = { ...tempObject, dow: subject };
            break;
          case 2:
            tempObject = { ...tempObject, subjectStart: subject };
            break;
          case 3:
            tempObject = { ...tempObject, amountOfSubject: subject };
            break;
          case 4:
            tempObject = { ...tempObject, room: subject };
            break;
          case 5:
            tempObject = { ...tempObject, CBGD: subject };
            break;
          case 6:
            const timeStamp = $(el)
              .attr("onmouseover")
              .slice(15, 37)
              .split("--");

            tempObject = {
              ...tempObject,
              week: {
                number: subject,
                date: {
                  dateStart: moment(timeStamp[0], "DD-MM-YYYY"),
                  dateEnd: moment(timeStamp[1], "DD--MM-YYYY"),
                },
              },
            };
            break;
          case 7:
            tempObject = { ...tempObject, dssv: subject };
            break;
          default:
            break;
        }
      });

    childArray.scheduleArray.push(tempObject);

    if (
      childArray.hasOwnProperty("code") &&
      childArray.hasOwnProperty("name")
    ) {
      newArray.push(childArray);
    }
  });
  return newArray;
};

module.exports = { crawlData, crawlName };
